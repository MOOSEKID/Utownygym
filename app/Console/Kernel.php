<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('users:blocked')->everyMinute();
        $schedule->command('send-class-schedule-alert')->everyMinute();
        $schedule->command('users:late-cancelled')->everyMinute();
        $schedule->command('coderstm:users-hold')->everyMinute();
        $schedule->command('coderstm:subscriptions-renew')->everyMinute();
        $schedule->command('coderstm:subscriptions-cancel')->everyMinute();
        $schedule->command('coderstm:subscriptions-canceled')->everyMinute();
        $schedule->command('coderstm:subscriptions-expired')->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
