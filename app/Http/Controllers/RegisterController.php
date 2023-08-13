<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Organizations;
use App\Models\OrganizationUser;
use App\Mail\OrgRegistered;
use App\Mail\ResetPasswordLink;
use App\Mail\PasswordResetSuccess;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

class RegisterController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:3',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else {
            if($request->user_role == 1){ //if individual user role 1
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'user_role' => $request->user_role,
                    'status' => 3
                ]);

                $organizationUser1 = OrganizationUser::create([
                    'user_id' => $user->id,
                    'organization_id' => 1,  // set the no organization record as the defauly org of the user
                    'status' => 1
                ]);
            }
            else {                      //if org user role 2
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'user_role' => 2, //$request->user_role,
                    'status' => 3
                ]);

                $organization = Organizations::create([
                    'user_id' => $user->id,
                    'org_name' => $request->name,
                    'slug' => strtolower(str_replace(' ', '', $request->name).uniqid()),
                    'org_type' => $request->org_type,
                    'org_size' => $request->org_size,
                    'reg_number' => $request->reg_number,
                    'email' => $request->email,
                    'description' => $request->description,
                    'org_logo' => '',
                    'status' => 3,
                    'contact_number' => $request->contact_number,
                ]);

                $organizationUser = OrganizationUser::create([
                    'user_id' => $user->id,
                    'organization_id' => $organization->id,
                    'status' => 1
                ]);

                Mail::to($request->email)->send(new OrgRegistered($user));
            }
            
            $token = $user->createToken($user->email.'_token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Registered successfully.',
            ]);
        }
    }

    public function sendResetPasswordLink(Request $request) {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return response()->json([
            'status' => 200,
            'message' => $status
        ]);
    }

    public function resetPassword(Request $request){
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
                event(new PasswordReset($user));

                Mail::to($user->email)->send(new PasswordResetSuccess($user->name));
            }
        );
        $result = 'There was an error resetting your password, please try again later';
        $status_code = 401;
        switch ($status) {
            case 'passwords.token':
                $result = 'Link has expired, please request a password reset link again';
                $status_code = 401;
                break;
            case 'passwords.user':
                $result = 'Invalid User';
                $status_code = 401;
                break;
            case 'passwords.throttled':
                $result = 'Too many password reset requests, Please try again in a few minutes';
                $status_code = 401;
                break;
            case 'passwords.reset':
                $result = 'Success';
                $status_code = 200;
                break;
        }
        return response()->json([
            'status' => $status_code,
            'message' => $result
        ]);
    }

}
