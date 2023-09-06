<?php

namespace App\Listeners;

use App\Events\TopicCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewTopicAvailableNotification;
use App\Models\User;

class SendTopicCreatedNotification
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
     * @param  \App\Events\TopicCreated  $event
     * @return void
     */
    public function handle(TopicCreated $event)
    {
        //
        $usersToNotify = User::where('user_role', 0)->get();
        
        Notification::send($usersToNotify, new NewTopicAvailableNotification($event->model));
    }
}
