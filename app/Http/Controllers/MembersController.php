<?php

namespace App\Http\Controllers;

use App\Models\Members;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $members = DB::table('members')->where([
            ['status', '=', '1'],
        ])->get();
        return response()->json([
            'status'=>200,
            'members'=>$members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'name' => 'required',
            ]
        );
        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else {
            $members = Members::create([
                'photo' => json_encode($request->photo),
                'name' => $request->name,
                'designation' => $request->designation,
                'facebook_url' => $request->facebook_url,
                'twitter_url' => $request->twitter_url,
                'linkedin_url' => $request->linkedin_url,
                'status' => 1,
            ]);

            return response()->json([
                'status' => 200,
                'message' => $request->name.' successfully added.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Members::where('id', '=', $id)->firstOrFail();  

        if($data) {
            return response()->json([
                'status' => 200,
                'get_data' => $data
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No ID found.!',
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
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else {
            $member = Members::find($id);
            if($member) {
                $member->photo = json_encode($request->photo);
                $member->name = $request->input('name');
                $member->designation = $request->input('designation');
                $member->facebook_url = $request->input('facebook_url');
                $member->twitter_url = $request->input('twitter_url');
                $member->linkedin_url = $request->input('linkedin_url');
                
                $member->save();
                return response()->json([
                    'status' => 200,
                    'message' => $member->name.' successfully updated.',
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No ID found.',
                ]);
            } 
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
