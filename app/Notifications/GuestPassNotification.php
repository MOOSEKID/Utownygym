<?php

namespace App\Notifications;

use App\Models\GuestPass;
use Coderstm\Models\Notification as Template;
use Coderstm\Notifications\BaseNotification;

class GuestPassNotification extends BaseNotification
{
    public $guestPass;
    public $user;
    public $subject;
    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(GuestPass $guestPass)
    {
        $this->guestPass = $guestPass;
        $this->user = $guestPass->user;

        $template = Template::default('admin:guest-pass-request');
        $shortCodes = array_merge($this->user->getShortCodes(), [
            '{{NOTE}}' => $this->guestPass->note,
            '{{DATE_TIME}}' => $this->guestPass->created_at->format('d M, Y \a\t h:i a'),
        ]);

        $this->subject = replace_short_code($template->subject, $shortCodes);
        $this->message = replace_short_code($template->content, $shortCodes);

        parent::__construct($this->subject, $this->message);
    }
}
