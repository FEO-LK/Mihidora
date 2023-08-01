<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Organizations;
use App\Models\OrganizationUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
                    'status' => 1
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
                    'status' => 1
                ]);

                $organizationUser = OrganizationUser::create([
                    'user_id' => $user->id,
                    'organization_id' => $organization->id,
                    'status' => 1
                ]);
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
}
