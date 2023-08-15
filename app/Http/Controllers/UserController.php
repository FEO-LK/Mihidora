<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Organizations;
use App\Models\OrganizationUser;
use App\Models\RejectedUsers;
use App\Mail\UserApproved;
use App\Mail\UserRejected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index()
    {
        $users = DB::table('users')
            ->where([['status', '=', '1']])
            ->orderByRaw('created_at DESC')
            ->get();
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }

    /**
     * Returns user profile with organization information
     */
    public function getOrgUsers()
    {
        $users = DB::table('users')
            ->join('organizations', 'users.id', '=', 'organizations.user_id')
            ->where([['users.status', '=', '1']])
            ->orderByRaw('users.created_at DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }

    public function getPendingOrganizations()
    {
        $users = DB::table('users')
            ->join('organizations', 'users.id', '=', 'organizations.user_id')
            ->where([['users.status', '=', '3']])
            ->orderByRaw('users.created_at DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }

    public function newRequest()
    {
        $users = DB::table('users')
            ->where([['status', '=', '2']])
            ->get();
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }

    public function editAccount($id)
    {
        $profileData = User::find($id);
        if ($profileData) {
            return response()->json([
                'status' => 200,
                'profile_data' => $profileData,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No user ID found.!',
            ]);
        }
    }

    public function updateAccount(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $profile = User::find($id);
            if ($profile) {
                $profile->name = $request->input('name');
                $profile->email = $request->input('email');
                //validate password in front end
                if ($request->has('password')) {
                    $profile->password = Hash::make(
                        $request->input('password')
                    );
                }
                $profile->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile updated successfully.',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User ID not found.',
                ]);
            }
        }
    }

    public function activateAccount(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->status = 1;
            $user->save();
            Mail::to($user->email)->send(new UserApproved($user));
            return response()->json([
                'status' => 200,
                'message' => 'User account activated.!',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User account not found.!',
            ]);
        }
    }

    public function deactivateAccount(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->status = 0;
            $user->save();

            return response()->json([
                'status' => 200,
                'message' => 'User account deactivated.!',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User account not found.!',
            ]);
        }
    }

    public function removeUserAccount(Request $request)
    {
        $user = User::find($request->user_id);
        $organization = Organizations::find($request->organization_id);
        $organization_user_account = OrganizationUser::find($request->organization_id);
        if(!$organization){
            return response()->json([
                'status' => 404,
                'message' => 'Organisation not found.!',
            ]);
        }

        if(!$organization_user_account){
            return response()->json([
                'status' => 404,
                'message' => 'Organisation User not found.!',
            ]);
        }
        /**
         * 1. create a record in rejected users before deleting
         * 2. delete the record from three tabels
         */
        $rejected_user = RejectedUsers::create([
            'name' => $user->name,
            'email' => $user->email,
            'org_name' => $organization->org_name,
            'reg_number' => $organization->reg_number,
            'contact_number' => $organization->contact_number,
            'joined_on' => $organization->created_at,
            'reviewed_by' => Auth::user()->id
        ]);
        $organization_user_account->delete();
        $organization->delete();
        $user->delete();
        
        Mail::to($user->email)->send(new UserRejected($user->name));

        if ($user) {
            return response()->json([
                'status' => 200,
                'account' => [
                    'user' => $user,
                    'organization' => $organization,
                    'organization_user_account' => $organization_user_account,
                    'rejected_user' => $rejected_user,
                ],
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User account not found.!',
            ]);
        }
    }

    public function pendingUsers()
    {
        $users = DB::table('users')
            ->where([['status', '=', '3']])
            ->get();
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }
}
