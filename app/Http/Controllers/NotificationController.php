<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\NewJobAlerts;
use App\Models\User;
use App\Models\Classifieds;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;

class NotificationController extends Controller
{
    //
    public function sendJobAlerts()
    {
        /**
         * Get job submissions for the past 30 days;
         */
        $endDate = Carbon::now();
        $startDate = Carbon::now()->subMonths(1); // 1 month ago
        $jobs = Classifieds::whereBetween('created_at', [
            $startDate,
            $endDate,
        ])
            ->where('type', 1)
            ->get();
        /**
         * TODO:- Check if notifications should be sent to all users or only for users who are subscribed to job alerts
         * For now send the alert only to admins
         */

        $users = User::where('user_role', 0)->get();
        $mailData = [];
        foreach ($users as $user) {
            $mailData = [
                'jobs' => $jobs,
                'user' => $user->name,
            ];
            Mail::to($user->email)->send(new NewJobAlerts($mailData));
        }
        return response()->json([
            'status' => 200,
            'message' => 'Alerts sent!',
            'users' => $users,
            'jobs' => $jobs
        ]);
    }
}
