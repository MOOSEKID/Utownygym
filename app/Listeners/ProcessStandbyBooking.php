<?php

namespace App\Listeners;

use App\Events\BookingCanceled;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class ProcessStandbyBooking implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\BookingCanceled  $event
     * @return void
     */
    public function handle(BookingCanceled $event)
    {
        $booking = $event->booking;
        if (!$booking->is_standby) {
            $schedule = $booking->schedule;
            $schedule->updateStandbyBookings();
        }
    }
}
