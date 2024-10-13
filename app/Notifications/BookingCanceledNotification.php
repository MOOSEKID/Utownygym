<?php

namespace App\Notifications;

use App\Models\Booking;
use Coderstm\Notifications\BaseNotification;

class BookingCanceledNotification extends BaseNotification
{
    public $subject;
    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Booking $booking)
    {
        $template = $booking->renderNotification('user:booking-canceled');

        $this->subject = $template->subject;
        $this->message = $template->content;

        parent::__construct($this->subject, $this->message);

        if ($this->canSendPush()) {
            $booking->sendPushNotify('push:booking-canceled');
        }
    }
}
