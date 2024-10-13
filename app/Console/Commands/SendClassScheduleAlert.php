<?php

namespace App\Console\Commands;

use App\Models\ClassSchedule;
use Illuminate\Console\Command;
use Coderstm\Jobs\SendPushNotification;
use Coderstm\Jobs\SendWhatsappNotification;
use Coderstm\Models\Notification;

class SendClassScheduleAlert extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-class-schedule-alert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send class schedule alert before 15 minutes of start';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now()->addMinutes(10);
        $fifteenMinutesFromNow = now()->addMinutes(15);

        ClassSchedule::has('class')
            ->whereBetween('date_at', [$now, $fifteenMinutesFromNow])
            ->each(function ($schedule) {
                foreach ($schedule->active_bookings as $booking) {
                    $class = $schedule->class;
                    $user = $booking->user;

                    $template = Notification::default('push:upcoming-class');
                    $shortCodes = [
                        '{{CLASS_NAME}}' => $class->name,
                        '{{SCHEDULE_DATE_AT}}' => $schedule->date_at_formated,
                        '{{SCHEDULE_START_AT}}' => $schedule->start_at_formated,
                    ];

                    $subject = replace_short_code($template->subject, $shortCodes);
                    $content = html_text(replace_short_code($template->content, $shortCodes));

                    dispatch(new SendPushNotification($user, [
                        'title' => $subject,
                        'body' => $content,
                    ], [
                        'route' => user_route('/classes/booked'),
                        'schedule_id' => $schedule->id,
                    ]));

                    dispatch(new SendWhatsappNotification($user, "{$subject}\n{$content}"));
                }
            });
    }
}
