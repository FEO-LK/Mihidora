<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use App\Models\PageFields;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = Pages::all();
        return response()->json([
            'status' => 200,
            'get_data' => $pages
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

    /** HOME PAGE */
    public function homePageEdit(Request $request, $page)
    {
        $data = PageFields::where('template', '=', $page)->get();  
        if($data) {
            return response()->json([
                'status' => 200,
                'get_data' => $data
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No template found.!',
            ]);
        }
    }
    public function homePageUpdate(Request $request, $template)
    {
        $validator = Validator::make($request->all(), [
            'title' => ' ',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else {
            $arrayVariable = array(
                'explore_title'  => $request->explore_title,
                'project_description' => $request->project_description,
                'data_description' => $request->data_description,
                'resource_description' => $request->resource_description,
                'elearning_description' => $request->elearning_description,
                'whatson_title' => $request->whatson_title,
                'banners' => json_encode($request->banners),
            );

            foreach($arrayVariable as $key => $value) {
                $getId = PageFields::where('template', '=', $template)
                    ->where('field', '=', $key)
                    ->get();    
                $pageField = PageFields::find($getId[0]->id);

                $pageField->user_id = $request->user_id;
                $pageField->template = 'home';
                $pageField->field = $key;
                $pageField->value = $value;

                $pageField->save();
            }

            return response()->json([
                'status' => 200,
                'message' => 'Successfully updated.',
            ]);

        }
    }


    public function aboutPageEdit(Request $request, $page)
    {
        $data = PageFields::where('template', '=', $page)->get();  
        if($data) {
            return response()->json([
                'status' => 200,
                'get_data' => $data
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No template found.!',
            ]);
        }
    }

    public function aboutPageUpdate(Request $request, $template)
    {
        $validator = Validator::make($request->all(), [
            'title' => ' ',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else {
            $arrayVariable = array(
                'intro_main_text'  => $request->intro_main_text,
                'intro_small_text' => $request->intro_small_text,
                'chart_title' => $request->chart_title,
                'chart_description' => $request->chart_description,
                'main_description' => $request->main_description,
                'project_description' => $request->project_description,
                'members_description' => $request->members_description,
                'main_banner' => json_encode($request->main_banner),
                'main_description_image' => json_encode($request->main_description_image),
                'our_trustees' => json_encode($request->our_trustees),
                'our_trustees_title' => $request->our_trustees_title,
                'our_trustees_text' => $request->our_trustees_text,
                'our_team_title' => $request->our_team_title,
            );

            foreach($arrayVariable as $key => $value) {
                $getId = PageFields::where('template', '=', $template)
                    ->where('field', '=', $key)
                    ->get();    
                    
                if(count($getId)==1){ // if found update
                    $pageField = PageFields::find($getId[0]->id);
                    $pageField->user_id = $request->user_id;
                    $pageField->template = 'about';
                    $pageField->field = $key;
                    $pageField->value = $value;
                    $pageField->save();
                }else{ // else insert
                    $user = PageFields::create([
                        'user_id' => (int) $request->user_id,
                        'template' => 'about',
                        'field' => $key,
                        'value' => $value,
                    ]);
                }
            }

            return response()->json([
                'status' => 200,
                'message' => 'Successfully updated.',
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($template)
    {
        $pages = DB::table('pages')
            ->select('*')
            ->where('template', $template)
            ->get();
    
        return response()->json([
            'status' => 200,
            'get_data' => $pages,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $data = Pages::where('id', '=', $id)->firstOrFail();  
        // if($data) {
        //     return response()->json([
        //         'status' => 200,
        //         'get_data' => $data
        //     ]);
        // }
        // else {
        //     return response()->json([
        //         'status' => 404,
        //         'message' => 'No ID found.!',
        //     ]);
        // }
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
        // $validator = Validator::make($request->all(), [
        //     'title' => 'required',
        // ]);

        // if($validator->fails()){
        //     return response()->json([
        //         'status' => 422,
        //         'errors' => $validator->messages(),
        //     ]);
        // }
        // else {
            // $page = Pages::find($id);
            // echo($request->input  );
            
            // if($project) {
            //     $project->project_title = $request->input('project_title');
            //     $project->overview = $request->input('overview');
            //     $project->description = $request->input('description');
            //     $project->locations = json_encode($request->locations);
            //     $project->photos = json_encode($request->photos);
            //     $project->start_date = $request->input('start_date');
            //     $project->end_date = $request->input('end_date');
            //     $project->linked_content = json_encode($request->linked_content);

            //     $project->save();
            //     return response()->json([
            //         'status' => 200,
            //         'message' => $project->project_title.' successfully updated.',
            //     ]);
            // }
            // else {
            //     return response()->json([
            //         'status' => 404,
            //         'message' => 'No project ID found.',
            //     ]);
            // } 
        // }
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
