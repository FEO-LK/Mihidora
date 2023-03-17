<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\Organizations;
use App\Models\OrgMember;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    public function getOrganisationMembers() 
    {   
        //load curret users org Id
        $organizationId = DB::table('organizations')
            ->where([['user_ID', '=', Auth::user()->id],])
            ->first(); 
        
            //dd($organizationId->id);
        $requestData = DB::table('org_members')
            ->join('users', 'org_members.user_id', '=', 'users.id')
            ->select('org_members.*', 'users.name', 'users.email')
            ->where('org_members.organization_id', $organizationId->id)
            ->get();
        return response()->json([
            'status' => 200,
            'get_data' => $requestData,
        ]);
    }

    public function checkUserRequest() 
    {   //better to add the orgId to the session/ auth
        
        $organizationId = DB::table('organizations')->where([
            ['user_ID', '=', Auth::user()->id],
        ])->first(); 
        $requestData = DB::table('org_members')
            ->join('users', 'org_members.user_id', '=', 'users.id')
            ->select('org_members.*', 'users.name', 'users.email')
            ->where('org_members.status', 1)
            ->where('org_members.organization_id', $organizationId->id)
            ->get();
        return response()->json([
            'status' => 200,
            'user_request' => $requestData,
        ]);
    }

    public function checkUserOrgs($slug) 
    {   //better to add the orgId to the session/ auth
        //slug and userId needed
        
        //get Org ID from slug
        $org_id = DB::table('organizations')
        ->select('id')
        ->where('slug', $slug)
        ->first();
        
        //get UserId from auth - Auth::user()->id

        $requestData = DB::table('org_members')
            ->join('users', 'org_members.user_id', '=', 'users.id')
            ->select('org_members.*', 'users.name', 'users.email')
            ->where('org_members.user_id', Auth::user()->id)
            ->where('org_members.organization_id', $org_id->id)
            ->get();

        return response()->json([
            'status' => 200,
            'user_org_status' => $requestData,
        ]);
    }

    public function sendUserRequest(Request $request) 
    {
        $OrganizationUser = OrgMember::create([
            'user_id' => Auth::id(),
            'organization_id' => $request->organization_id,
        ]);
    }

    public function updateMemberRequest(Request $request, $id) {
        $requestId = OrgMember::find($id);
        if($requestId) {
            $requestId->status = $request->input('status');
            $requestId->save();
            return response()->json([
                'status' => 200,
                'message' => 'Request updated successfully.',
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No request ID found.',
            ]);
        } 
    }


}
