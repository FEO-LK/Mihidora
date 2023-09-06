<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Illuminate\Support\Facades\Validator;
use App\Enums\Topics;
class SubscriptionController extends Controller
{
    //

    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'topic' => ['required', 'in:' . implode(',', Topics::getValues())],
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $user_id = $request->user_id;
        $topic = $request->topic;

        $subscription = Subscription::where([
            ['user_id', '=', $user_id],
            ['topic', '=', $topic],
        ])->get();

        if (!$subscription->isEmpty()) {
            return response()->json([
                'status' => 400,
                'message' => 'Suscription already exists',
            ]);
        }

        Subscription::create([
            'user_id' => $user_id,
            'topic' => $topic,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Success!',
        ]);
    }

    public function unsubscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'topic' => ['required', 'in:' . implode(',', Topics::getValues())],
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $user_id = $request->user_id;
        $topic = $request->topic;
        $subscription = Subscription::where([
            ['user_id', '=', $user_id],
            ['topic', '=', $topic],
        ])->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Success!',
        ]);
    }

    public function getSubscriptions(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $user_id = $request->user_id;
        $subscription = Subscription::where('user_id', $user_id)->get();
        $subscribed_topics = [];
        foreach ($subscription as $object) {
            $subscribed_topics[] = $object['topic'];
        }
        $topics = Topics::getValues();//implode(',', Topics::getValues());
        $subscription_list = [];
        foreach ($topics as $topic) {
            if(in_array($topic, $subscribed_topics)){
                $subscription_list[] = [
                    'topic' => $topic,
                    'subscribed' => true,
                ];
            } else {
                $subscription_list[] = [
                    'topic' => $topic,
                    'subscribed' => false,
                ];
            }
        }
        return response()->json([
            'status' => 200,
            'subscription' => $subscription_list,
        ]);
    }
}
