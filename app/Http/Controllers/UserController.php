<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index() {
        $users = DB::table('users')->where([
            ['status', '=', '1'],
        ])->get();
        return response()->json([
            'status'=>200,
            'users'=>$users
        ]);
    }

    public function newRequest() {
        $users = DB::table('users')->where([
            ['status', '=', '2'],
        ])->get();
        return response()->json([
            'status'=>200,
            'users'=>$users
        ]);
    }

    public function editAccount($id) {
        $profileData = User::find($id);
        if($profileData) {
            return response()->json([
                'status' => 200,
                'profile_data' => $profileData,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No user ID found.!',
            ]);
        }
    }

    public function updateAccount(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else {
            $profile = User::find($id);
            if($profile) {
                $profile->name = $request->input('name');
                $profile->email = $request->input('email');
                //validate password in front end
                if($request->has('password')){
                    $profile->password = Hash::make($request->input('password'));
                }
                $profile->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile updated successfully.',
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User ID not found.',
                ]);
            } 
        }
    }

    public function activateAccount(Request $request, $id) {
        $user = User::find($id);
        if($user) {
            $user->status = 1;
            $user->save();

            return response()->json([
                'status' => 200,
                'message' => 'User account deactivated.!'
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'User account not found.!'
            ]);
        }
    }

    public function deactivateAccount(Request $request, $id) {
        $user = User::find($id);
        if($user) {
            $user->status = 0;
            $user->save();

            return response()->json([
                'status' => 200,
                'message' => 'User account deactivated.!'
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'User account not found.!'
            ]);
        }
    }

    public function pendingUsers(){
        $users = DB::table('users')->where([
            ['status', '=', '3'],
        ])->get();
        return response()->json([
            'status'=>200,
            'users'=>$users
        ]);
    }
    
}
