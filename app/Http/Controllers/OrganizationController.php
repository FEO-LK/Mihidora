<?php

namespace App\Http\Controllers;
use App\Models\Cities;
use App\Models\Districts;
use Illuminate\Http\Request;
use App\Models\Organizations;
use App\Models\OrganizationType;
use App\Models\OrganizationUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class OrganizationController extends Controller
{

    /** All organization list - Frontend */
    public function index()
    {
        $organizations = Organizations::where('id','>',1)
             ->orderBy('id', 'desc')
             ->get();
        return response()->json([
            'status'=>200,
            'organizations'=>$organizations
        ]);
    }

     public function filterOrganizations(Request $body)
            {
                $district_id = $body->input('district');
                $tag_names = $body->input('tags');
                $organizations = Organizations::where('id','>',1)
                    ->orderBy('id', 'desc')
                    ->get();
                $tags = [];
                foreach($organizations as $organization) {
                    $tag = $organization->tags->pluck('name','type','id');
                    array_push($tags, $tag);
                }

                $filteredOrganizations = $organizations->filter(function($organization) use ($district_id) {
                    if($district_id != null && $organization->district_id != $district_id) {
                        return false;
                    }
                    return true;
                });

                $filteredOrganizations = $filteredOrganizations->filter(function($organization) use ($tag_names) {
                    if($tag_names != null) {
                        $organizationTags = $organization->tags->pluck('name')->toArray();
                        if(count(array_intersect($organizationTags, $tag_names)) == 0) {
                            return false;
                        }
                    }
                    return true;
                });

                $ProjectDistricts = [];
                foreach ($filteredOrganizations as $job) {
                    $ProjectDistrict = Districts::select('name_en')->where('id', $job->district_id)->first();
                    array_push($ProjectDistricts, $ProjectDistrict);
                }

                return response()->json([
                    'status'=>200,
                    'filteredOrganizations'=>$filteredOrganizations,
                    'locations'=>$ProjectDistricts,
                ]);
            }

    /** All organization list - Frontend */
    public function organizationMap()
    {
        $organizationMap = DB::table('organizations')
            ->select('locations', 'org_name')
            //->where('locations','!=', [])
            ->get();
        return response()->json([
            'status'=>200,
            'organization_map'=>$organizationMap
        ]);
    }

    /** Organization single page - Frontend */
    public function show($slug)
    {
        $organization = Organizations::where('slug', $slug)->first();
        $organizationCity = Cities::select('name_en')->where('id', $organization->city_id)->first();
        $organizationDistrict = Cities::select('name_en')->where('id', $organization->district_id)->first();

        if($organizationCity == null) { $city = 1; } else { $city = $organizationCity; }
        if($organizationDistrict == null) { $district = 1; } else { $district = $organizationDistrict; }

        $tags = $organization->tags->pluck('name');
        $orgType = OrganizationType::select('type')->where('id', $organization->org_type)->first();
        $organization['type'] = $orgType->type;
        if($organization) {
            return response()->json([
                'status' => 200,
                'get_data' => $organization,
                'tags' => $tags,
                'organization_city' => $city,
                'organization_district' => $district,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No Organisation ID found.!',
            ]);
        }
    }

    /** Organization function */
    public function getUserOrganisations($slug) {
        if(Auth::user()) {
            $user_id = Auth::user()->id;
            $org_id = DB::table('organizations')
            ->select('id')
            ->where('slug', $slug)
            ->first();

            if($user_id) {
                $organizations = Organizations::with(['organizationUser'=>function($query)use($user_id){
                    $query
                    ->where('user_id',$user_id);}])
                    //->where('id','>',1)
                    ->where('id', $org_id->id)
                    ->first();
            }
        }
        return response()->json([
            'status'=>200,
            'organizations'=>$organizations
        ]);
    }

    public function getUserOrganisationsByUserId($user_id)
    {
        $organizationUser = DB::table('organization_users')
            ->select('*')
            ->where('user_id', $user_id)
            ->get();
        $organization = DB::table('organizations')
            ->select('*')
            ->where('id', $organizationUser[0] -> organization_id)
            ->get();
        return response()->json([
            'status'=>200,
            'organization'=>$organization,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Organizations $organization, $org_id) {
        $profileData = Organizations::where('id', '=', $org_id)->firstOrFail();
        $array1 = $profileData->tags->pluck('name');
        foreach($array1 as $key => $arg) {
            $results[] = $arg;
        }
        if(isset($results)) {
            $tags = implode(',', $results);
        }
        else {
            $tags = NULL;
        }
        if($profileData) {
            return response()->json([
                'status' => 200,
                'get_data' => $profileData,
                'tags' => $tags,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No user ID found.!',
            ]);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $profile = Organizations::find($id);
        if($profile) {
            $profile->org_name = $request->input('org_name');
            $profile->org_size = $request->input('org_size');
            $profile->reg_number = $request->input('reg_number');
            $profile->org_type = $request->input('org_type');
            $profile->description = $request->input('description');
            $profile->org_logo = json_encode($request->input('org_logo'));
            
            $profile->delete(); //deleting the tags and re adding

            $tagsThematic = $request->input('tags_thematic');
            $tagsSubject = $request->input('tags_subject');
            $tagsExtra = $request->input('tags_extra');
            $profile->attachTags($tagsThematic, 1);
            $profile->attachTags($tagsSubject, 2);
            $profile->attachTags($tagsExtra, 3);

            $profile->save();
            return response()->json([
                'status' => 200,
                'message' => 'Profile updated successfully.',
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'Profile update failed.',
            ]);
        }
    }

    public function updateContactData(Request $request, $id) {
        $profile = Organizations::find($id);
        if($profile) {
            $profile->contact_number = $request->input('contact_number');
            $profile->contact_person = $request->input('contact_person');
            $profile->email = $request->input('email');
            $profile->website = $request->input('website');
            $profile->address = $request->input('address');
            $profile->social_media = json_encode($request->input('social_media')) ;
            $profile->contact_nos_hod = $request->input('contact_nos_hod');
            $profile->contact_name_hod = $request->input('contact_name_hod');
            $profile->contact_designation_hod = $request->input('contact_designation_hod');
            $profile->contact_no_focalpoint = $request->input('contact_no_focalpoint');
            $profile->contact_nos_focalpoint = $request->input('contact_nos_focalpoint');
            $profile->contact_name_focalpoint = $request->input('contact_name_focalpoint');
            $profile->contact_designation_focalpoint = $request->input('contact_designation_focalpoint');
            $profile->contact_email_focalpoint = $request->input('contact_email_focalpoint');
            $profile->contact_linkedin_focalpoint = $request->input('contact_linkedin_focalpoint');
            $profile->save();
            return response()->json([
                'status' => 200,
                'message' => 'Contact data updated successfully.',
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'Contact data update is failed.',
            ]);
        }
    }

    public function updateStaffProfile(Request $request, $id) {
        $profile = Organizations::find($id);
        if($profile) {
            $profile->staffprofile_active_no = $request->input('staffprofile_active_no');
            $profile->staffprofile_percentage_paid_staff = $request->input('staffprofile_percentage_paid_staff');
            $profile->staffprofile_volunteers_no = $request->input('staffprofile_volunteers_no');
            $profile->primary_activities = $request->input('primary_activities');
            $profile->main_delivery_mode = $request->input('main_delivery_mode');
            $profile->existing_profiles = $request->input('existing_profiles');
            $profile->locations = $request->input('locations');
            $profile->save();
            return response()->json([
                'status' => 200,
                'message' => 'Staff data updated successfully.',
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'Staff data update is failed.',
            ]);
        }
    }

    public function delete($id)
    {   
        $post = Organizations::find($id);
        if($post){
            $post->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Record deleted',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No ID found.',
            ]);
        }
    }
}
