<?php

namespace App\Models;

use Coderstm\Traits\Core;
use Coderstm\Models\Notification;
use Coderstm\Jobs\SendPushNotification;
use Illuminate\Database\Eloquent\Model;
use Coderstm\Jobs\SendWhatsappNotification;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use Core;

    protected $fillable = [
        'user_id',
        'schedule_id',
        'is_standby',
        'attendance',
        'status',
        'source',
        'canceled_at',
        'schedules_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_standby' => 'boolean',
        'attendance' => 'boolean',
        'source' => 'boolean',
        'canceled_at' => 'datetime',
        'schedules_at' => 'datetime',
    ];

    protected $appends = [
        'same_day_canceled',
        'cancelable',
    ];

    protected $with = ['user'];

    protected function sameDayCanceled(): Attribute
    {
        return Attribute::make(
            get: fn() => !is_null($this->canceled_at) && $this->canceled_at->dayName == $this->created_at->dayName,
        );
    }

    protected function cancelable(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->canCancel(),
        );
    }

    public function canCancel()
    {
        $diffInHours = now()->diffInHours($this->schedules_at, false);
        if (is_null($this->canceled_at) && $this->schedules_at->isToday() && $diffInHours < 5 && $diffInHours > 0) {
            return 'late-cancellation';
        }
        return is_null($this->canceled_at) && $this->schedules_at->gte(now());
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function schedule(): BelongsTo
    {
        return $this->belongsTo(ClassSchedule::class, 'schedule_id');
    }

    public function scopeSortByUser($query)
    {
        return $query->leftJoin('users', 'users.id', '=', 'bookings.user_id')
            ->select('*', 'bookings.id as id')
            ->orderBy('users.first_name', 'asc');
    }

    public function scopeOnlyActive($query)
    {
        return $query->onlyNotCanceled()->where('is_standby', 0);
    }

    public function scopeOnlyNotCanceled($query)
    {
        return $query->whereNull('canceled_at');
    }

    public function scopeOnlyAttended($query)
    {
        return $query->onlyNotCanceled()
            ->whereHas('schedule', function ($q) {
                $q->whereNotNull('sign_off_at');
            })
            ->where('attendance', 1);
    }

    public function scopeOnlyNotAttended($query)
    {
        return $query->where('attendance', 0);
    }

    public function scopeOnlyCanceled($query)
    {
        return $query->whereNotNull('canceled_at');
    }

    public function scopeOnlyStandBy($query)
    {
        return $query->onlyNotCanceled()->where('is_standby', 1);
    }

    public function scopeOnlyNoShow($query)
    {
        return $query->onlyNotCanceled()
            ->onlyActive()
            ->where('attendance', 0)
            ->whereHas('schedule', function ($q) {
                $q->whereNotNull('sign_off_at');
            });
    }

    public function scopeOnlyLastWeekNoShow($query)
    {
        return $query->onlyNoShow()
            ->whereHas('schedule', function ($schedule) {
                $schedule->whereRaw('date_at BETWEEN ? AND ?', [now()->subDays(7)->format('Y-m-d'), now()->format('Y-m-d')])
                    ->whereNotNull('sign_off_at');
            });
    }

    public function scopeOnlyLateCancellation($query)
    {
        return $query->where('is_standby', 0)
            ->whereNotNull('canceled_at')
            ->whereRaw("DATE(schedules_at) = DATE(canceled_at)")
            ->whereRaw("TIMESTAMPDIFF(HOUR, canceled_at, schedules_at) < 5");
    }

    public function scopeOnlyLastWeekLateCancellation($query)
    {
        return $query->onlyLateCancellation()
            ->whereBetween('canceled_at', [now()->subDays(7), now()]);
    }

    public function cancel()
    {
        if ($this->canCancel() === false) {
            abort(422, 'You can\'t cancel past day bookings.');
        }

        $this->schedule->logs()->create([
            'type' => 'booking-canceled',
            'message' => "<span class=\"mention\" data-user=\"{$this->user->id}\">{$this->user->name}</span> has been canceled."
        ]);
        return $this->update([
            'canceled_at' => now()
        ]);
    }

    public function renderNotification($type): Notification
    {
        $template = Notification::default($type);

        $shortCodes = array_merge($this->user->getShortCodes(), [
            '{{CLASS_NAME}}' => optional($this->schedule->class)->name,
            '{{INSTRUCTOR_NAME}}' => optional($this->schedule->instructor)->name,
            '{{SCHEDULE_DATE_AT}}' => $this->schedule->date_at_formated,
            '{{SCHEDULE_START_AT}}' => $this->schedule->start_at_formated,
        ]);

        return $template->fill([
            'subject' => replace_short_code($template->subject, $shortCodes),
            'content' => replace_short_code($template->content, $shortCodes),
        ]);
    }

    public function sendPushNotify($type)
    {
        try {
            $template = $this->renderNotification($type);

            dispatch(new SendPushNotification($this->user, [
                'title' => $template->subject,
                'body' => html_text($template->content)
            ], [
                'route' => user_route('/classes/booked'),
                'schedule_id' => $this->schedule_id,
            ]));
        } catch (\Exception $e) {
            //throw $e;
            report($e);
        }

        dispatch(new SendWhatsappNotification($this->user, "{$template->subject}\n{$template->content}"));
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->schedules_at)) {
                $model->schedules_at = $model->schedule->date_at;
            }
        });
    }
}
