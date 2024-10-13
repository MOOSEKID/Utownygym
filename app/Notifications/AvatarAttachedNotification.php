<?php

namespace App\Notifications;

use App\Models\User;
use Coderstm\Models\Notification as Template;
use Coderstm\Notifications\BaseNotification;

class AvatarAttachedNotification extends BaseNotification
{
    public $user;
    public $subject;
    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;

        $template = Template::default('admin:member-avatar-update');
        $shortCodes = [
            '{{USER_NAME}}' => $this->user->name,
            '{{USER_ID}}' => $this->user->id,
            '{{USER_FIRST_NAME}}' => $this->user->first_name,
            '{{USER_LAST_NAME}}' => $this->user->last_name,
            '{{USER_PHONE_NUMBER}}' => $this->user->phone_number,
            '{{USER_EMAIL}}' => $this->user->email,
            '{{AVATAR_URL}}' => optional($this->user->avatar)->url,
            '{{AVATAR_NAME}}' => optional($this->user->avatar)->name,
        ];

        $this->subject = replace_short_code($template->subject, $shortCodes);
        $this->message = replace_short_code($template->content, $shortCodes);

        parent::__construct($this->subject, $this->message);
    }
}
