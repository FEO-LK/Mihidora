<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Organizations;
use App\Models\Projects;
use App\Models\DataEducation;
use App\Models\WhatsOn;
use App\Models\Classifieds;
use Spatie\Tags\Tag;
//use Nette\Utils\Image;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    /**
     * Display the specified resource.
     * @return \Illuminate\Http\Response
     */
    public function searchByFilters(Request $request)
    {   //order by | most relavant - most recent
        // paginate 50
        
        //1. organization title, district, city, thematicTag, subjectTag, documentTag |  
        //2. project title 
        //data title
        //whats on title
        //classified title
        //e-learning title 
        //bodyTitleFullTextSearch string

        //might be userful : whereJsonContains('options->languages', 'en'), whereNotNull('updated_at')

        //$org = Organizations::select('user_id')->where('slug', $org_slug)->first();
        $projects = DB::table('projects')
            ->select('*')
            ->where('user_id', $request->input('tags_thematic'))
            ->get();

        return response()->json([
            'status'=>200,
            'projects'=>$projects,
        ]);


    }

}
