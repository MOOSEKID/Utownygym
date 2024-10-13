<?php

namespace App\Listeners;

use Coderstm\Enum\AppStatus;
use App\Events\UserStatusUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\MemberStatusUpdateNotification;

class UserStatusUpdatedNotification implements ShouldQueue
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
     * @param  \App\Events\UserStatusUpdated  $event
     * @return void
     */
    public function handle(UserStatusUpdated $event)
    {
        $user = $event->log->logable;
        $current = $event->log->options['status']['current'];

        admin_notify(new MemberStatusUpdateNotification($event->log, $current));

        if (in_array($current, [AppStatus::DEACTIVE->value, AppStatus::HOLD->value])) {
            $this->cancelNow($user);
        }
    }

    protected function cancelNow($user)
    {
        try {
            return $user->subscription()->cancelNow();
        } catch (\Exception $e) {
            //throw $e;
        }
    }
}
