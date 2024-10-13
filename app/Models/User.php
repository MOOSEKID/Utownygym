<?php

namespace App\Models;

use Coderstm\Enum\AppRag;
use Coderstm\Enum\AppStatus;
use Coderstm\Models\User as Model;
use Illuminate\Support\Facades\DB;
use Database\Factories\UserFactory;
use App\Models\Questionnaire\Submission;
use Coderstm\Coderstm;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'is_active',
        // extra
        'member_id',
        'note',
        'status',
        'source',
        'gender',
        'rag',
        'admin_id',
        'checked',
        'request_parq',
        'request_avatar',
        'release_at',
        'rfid',
        'qrcode',
        'email_marketing',
        'collect_tax',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'qrcode',
    ];

    protected $casts = [
        'release_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'trial_ends_at' => 'datetime',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'status_change_at' => 'datetime',
        'rag' => AppRag::class,
        'status' => AppStatus::class,
        'is_active' => 'boolean',
        'request_parq' => 'boolean',
        'request_avatar' => 'boolean',
        'checked' => 'boolean',
        'email_marketing' => 'boolean',
        'collect_tax' => 'boolean',
    ];

    protected $appends = [
        'name',
        'member_since',
        'member_id_formated',
        'guard',
        'has_avatar',
        'has_parq',
        'has_blocked',
        'is_subscribed',
        'has_cancelled',
        'qrcode_url',
    ];

    protected $with = [
        'avatar',
        'address',
    ];

    public function getMemberIdFormatedAttribute()
    {
        return "{$this->member_id}-28{$this->id}";
    }

    public function getQrcodeUrlAttribute($value)
    {
        return route('users.qrcode', [
            'user' => $this->id
        ]);
    }

    public function getIsEnquiryAttribute($value)
    {
        return $this->status != AppStatus::ACTIVE;
    }

    public function getHasParqAttribute()
    {
        return !empty($this->parq);
    }

    public function getHasBlockedAttribute()
    {
        return $this->isBlocked() && !$this->blocked->disabled;
    }

    public function getHasAvatarAttribute()
    {
        return !empty($this->avatar);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function lastNsBookings(): HasOne
    {
        return $this->hasOne(Booking::class)
            ->withOnly(['schedule'])
            ->onlyLastWeekNoShow()
            ->orderBy('schedules_at', 'desc');
    }

    public function lastLateCancellation(): HasOne
    {
        return $this->hasOne(Booking::class)
            ->withOnly(['schedule'])
            ->onlyLastWeekLateCancellation()
            ->orderBy('schedules_at', 'desc');
    }

    public function schedules(): BelongsToMany
    {
        return $this->belongsToMany(ClassSchedule::class, 'bookings', 'user_id', 'schedule_id');
    }

    public function blocked(): HasOne
    {
        return $this->hasOne(Block::class);
    }

    public function isBlocked()
    {
        return $this->blocked && $this->blocked->is_active();
    }

    public function updateOrCreateBlocked(array $attributes = [])
    {
        return $this->blocked()->updateOrCreate([
            'user_id' => $this->id
        ], [
            'disabled' => optional((object) $attributes)->disabled ?? false,
            'release_at' => optional((object) $attributes)->release_at ?? now()->addDays(3),
            'type' => optional((object) $attributes)->type ?? 'NS',
        ]);
    }

    public function parq(): HasOne
    {
        return $this->hasOne(Submission::class)->latestOfMany();
    }

    public function updateOrCreateParq(array $parq)
    {
        if ($this->parq) {
            return $this->parq()->update((new Submission($parq))->toArray());
        } else {
            return $this->parq()->save(new Submission($parq));
        }
    }

    public function scopeOnlyMember($query): Builder
    {
        return $query->where([
            'status' => AppStatus::ACTIVE
        ]);
    }

    public function scopeOnlyNoShow($query): Builder
    {
        return $query->with('lastNsBookings')->withCount([
            'bookings as ns_bookings_count' => function ($query) {
                $query->onlyLastWeekNoShow();
            },
        ])->whereHas('bookings', function ($booking) {
            $booking->onlyLastWeekNoShow();
        });
    }

    public function scopeOnlyBlocked($query): Builder
    {
        return $query->with('blocked')->whereHas('blocked', function ($booking) {
            $booking->blocked();
        });
    }

    public function scopeOnlyUnblocked($query): Builder
    {
        return $query->doesntHave('blocked')->orWhereHas('blocked', function ($booking) {
            $booking->unblocked();
        });
    }

    public function scopeOnlyLateCancellation($query): Builder
    {
        return $query->with('lastLateCancellation')->withCount([
            'bookings as late_cancellation_count' => function ($query) {
                $query->onlyLastWeekLateCancellation();
            },
        ])->whereHas('bookings', function ($booking) {
            $booking->onlyLastWeekLateCancellation();
        });
    }

    public function scopeOnlyChecked($query, int $type = 1): Builder
    {
        return $query->where('checked', $type);
    }

    public function scopeOnlyParq($query, bool $has = true): Builder
    {
        if ($has) {
            return $query->has('parq');
        }
        return $query->doesntHave('parq');
    }

    public function scopeOnlyNoParq($query): Builder
    {
        return $query->onlyParq(false);
    }

    public function scopeOnlyPic($query, bool $has = true): Builder
    {
        if ($has) {
            return $query->has('avatar');
        }
        return $query->doesntHave('avatar');
    }

    public function scopeOnlyNoPic($query): Builder
    {
        return $query->onlyPic(false);
    }

    public function scopeWhereTyped($query, string $type = null): Builder
    {
        switch ($type) {
            case 'checked':
                $query->onlyChecked();
                break;

            case 'notchecked':
                $query->onlyChecked(0);
                break;

            case 'parq':
                $query->onlyParq();
                break;

            case 'notparq':
                $query->onlyNoParq();
                break;

            case 'pic':
                $query->onlyPic();
                break;

            case 'notpic':
                $query->onlyNoPic();
                break;

            case 'rolling':
                $query->onlyRolling();
                break;

            case 'ends':
            case 'end_date':
                $query->onlyEnds();
                break;

            case 'month':
            case 'year':
                $query->onlyPlan($type);
                break;

            case 'free':
                $query->onlyFree();
                break;
        }

        return $query;
    }

    public function scopeSortBy($query, $column = 'CREATED_AT_ASC', $direction = 'asc'): Builder
    {
        switch ($column) {
            case 'last_login':
                $query->orderByRaw('(SELECT MAX(created_at) FROM logs WHERE logs.logable_id = users.id AND logs.logable_type = ? AND logs.type = ?) ' . ($direction ?? 'asc'), [$this->getMorphClass(), 'login']);
                break;

            case 'last_update':
                $query->orderByRaw('(SELECT MAX(created_at) FROM logs WHERE logs.logable_id = users.id AND logs.logable_type = ? AND logs.type = ?) ' . ($direction ?? 'asc'), [$this->getMorphClass(), 'notes']);
                break;

            case 'created_by':
                $query->orderByRaw(
                    'CASE
                        WHEN (SELECT admin_id FROM logs WHERE logs.logable_id = users.id AND logs.logable_type = ? AND logs.type = ? ORDER BY created_at DESC LIMIT 1) IS NOT NULL
                        THEN (SELECT first_name FROM admins WHERE admins.id = (SELECT admin_id FROM logs WHERE logs.logable_id = users.id AND logs.logable_type = ? AND logs.type = ? ORDER BY created_at DESC LIMIT 1))
                        ELSE JSON_EXTRACT((SELECT options FROM logs WHERE logs.logable_id = users.id AND logs.logable_type = ? AND logs.type = ? ORDER BY created_at DESC LIMIT 1), "$.ref")
                    END ' . ($direction ?? 'asc'),
                    [$this->getMorphClass(), 'created', $this->getMorphClass(), 'created', $this->getMorphClass(), 'created']
                );
                break;

            case 'last_ns_bookings':
                $query->orderBy(Booking::onlyLastWeekNoShow()->limit(1)->select('schedules_at')->whereColumn('bookings.user_id', 'users.id'), $direction ?? 'asc');
                break;

            case 'price':
                $query->orderByRaw('(
                    SELECT label
                    FROM (
                        SELECT label
                        FROM plans
                        WHERE id = (
                            SELECT plan_id
                            FROM subscriptions
                            WHERE user_id = users.id
                            ORDER BY created_at DESC
                            LIMIT 1
                        )
                        LIMIT 1
                    ) AS subquery
                ) ' . ($direction ?? 'asc'));
                break;

            case 'name':
                $query->orderBy(DB::raw("CONCAT(`first_name`, `last_name`)"), $direction ?? 'asc');
                break;

            default:
                $query->orderBy($column ?: 'created_at', $direction ?? 'asc');
                break;
        }

        return $query;
    }

    static public function findByQrcode($qrcode)
    {
        if ($user = static::where('qrcode', $qrcode)->first()) {
            return $user;
        } else {
            throw new ModelNotFoundException('Invalid QR code. Please provide a valid QR code.');
        }
    }

    static public function generateUniqueQRCode()
    {
        $randomInteger = mt_rand(1000000000, 9999999999);

        while (static::where('qrcode', $randomInteger)->exists()) {
            $randomInteger = mt_rand(1000000000, 9999999999);
        }

        return $randomInteger;
    }

    public function toLoginResponse()
    {
        return $this->load(['parq', 'blocked'])
            ->loadUnreadEnquiries()
            ->toArray();
    }

    public function addDeviceToken(string $deviceToken)
    {
        if (!$deviceToken) {
            throw new \InvalidArgumentException('Device token cannot be empty.');
        }

        return $this->deviceTokens()->updateOrCreate([
            'token' => $deviceToken
        ]);
    }

    public function checkedIn($message = null)
    {
        // Check if there is a log with type 'check-in' within the last 5 minutes
        $logExists = $this->logs()->where('type', 'check-in')
            ->where('created_at', '>=', now()->subMinutes(5))
            ->exists();

        if (!$logExists) {
            // Create a new log entry
            $this->logs()->create([
                'type' => 'check-in',
                'message' => $message ?? 'Successfully checked in at ' . now()->format(Coderstm::$dateTimeFormat),
            ]);
        }
    }

    public function accessDenied($message = null)
    {
        // Check if there is a log with type 'access-denied' within the last 5 minutes
        $logExists = $this->logs()->where('type', 'access-denied')
            ->where('created_at', '>=', now()->subMinutes(5))
            ->exists();

        if (!$logExists) {
            // Create a new log entry
            $this->logs()->create([
                'type' => 'access-denied',
                'message' => $message ?? 'Access denied at ' . now()->format(Coderstm::$dateTimeFormat),
            ]);
        }
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return UserFactory::new();
    }

    protected static function booted()
    {
        parent::booted();
        static::creating(function (self $model) {
            if (empty($model->member_id)) {
                $model->member_id = now()->format('dmy');
            }
            if (empty($model->qrcode)) {
                $model->qrcode = static::generateUniqueQRCode();
            }
        });
    }
}
