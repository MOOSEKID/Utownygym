<?php

namespace App\Notifications;

use App\Models\Booking;
use Coderstm\Notifications\BaseNotification;

class BookingConfirmationNotification extends BaseNotification
{
    public $message;
    public $subject;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Booking $booking, bool $standby = false)
    {
        $type = 'user:booking-confirmed';

        if ($standby) {
            $type = 'user:booking-standby-confirmed';
        } else if ($booking->is_standby) {
            $type = 'user:booking-standby';
        }

        $template = $booking->renderNotification($type);

        $this->subject = $template->subject;
        $this->message = $template->content;

        parent::__construct($this->subject, $this->message);

        if ($this->canSendPush()) {
            $booking->sendPushNotify(str_replace('user:', 'push:', $type));
        }
    }
}
