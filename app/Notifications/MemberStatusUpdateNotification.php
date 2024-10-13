<?php

namespace App\Notifications;

use Coderstm\Models\Log;
use Coderstm\Models\Notification as Template;
use Coderstm\Notifications\BaseNotification;

class MemberStatusUpdateNotification extends BaseNotification
{
    public $log;
    public $user;
    public $admin;
    public $subscription;
    public $subject;
    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Log $log, $status = 'Active')
    {
        $user = $log->logable;
        $this->log = $log;
        $this->user = $user;
        $previous = $log->options['status']['previous'];
        $this->subscription = $user->subscription();
        $this->admin = optional($log->admin)->name ?? 'System';

        $template = Template::default('admin:member-status-update');
        $shortCodes = [
            '{{USER_NAME}}' => $this->user->name,
            '{{USER_ID}}' => $this->user->id,
            '{{USER_FIRST_NAME}}' => $this->user->first_name,
            '{{USER_LAST_NAME}}' => $this->user->last_name,
            '{{USER_PHONE_NUMBER}}' => $this->user->phone_number,
            '{{USER_EMAIL}}' => $this->user->email,
            '{{PLAN}}' => optional($this->user->price)->label,
            '{{PLAN_PRICE}}' => $this->subscription ? format_amount(optional($this->subscription->price)->amount * 100) : null,
            '{{BILLING_CYCLE}}' => $this->subscription ? optional($this->subscription->price)->interval : null,
            '{{NOTE}}' => $this->user->note,
            '{{DATE_TIME}}' => $this->log->date_time,
            '{{CURRENT_STATUS}}' => $status,
            '{{PREVIOUS_STATUS}}' => $previous,
            '{{ADMIN}}' => $this->admin,
            '{{UPDATED_BY}}' => $this->admin,
        ];

        $this->subject = replace_short_code($template->subject, $shortCodes);
        $this->message = replace_short_code($template->content, $shortCodes);

        parent::__construct($this->subject, $this->message);
    }
}
