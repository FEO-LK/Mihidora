<?php

namespace App\Http\Controllers;

use App\Models\WhatsOn;
use Illuminate\Http\Request;
use App\Models\Organizations;
use App\Models\Cities;
use App\Models\Districts;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class WhatsOnController extends Controller
{


    /** All events list - Frontend */
    public function ProjectEventsList()
    {
        $events = DB::table('project_events_opportunities')
            ->select('*')
            ->where('type', 1)
            ->get();

        return response()->json([
            'status'=>200,
            'events'=>$events,
        ]);
    }



    /** All media articles list - Frontend */
    public function ProjectMediaAndArticlesList()
    {
        $articles = DB::table('project_events_opportunities')
            ->select('*')
            ->where('type', 2)
            ->get();

        return response()->json([
            'status'=>200,
            'articles'=>$articles,
        ]);
    }

  /** Filter Whats on events data by district and tags */
    public function filterWhatsOnEvents(Request $body)
        {
            $district_id = $body->input('district'); // user selected location
            $tag_names = $body->input('tags');       // user selected tags from all 3 types

            $dataset = WhatsOn::where('type','=',1)->select('*')->get(); // load all whats on result set
            $tags = [];

            foreach($dataset as $data) { //load tags related to events to $tags
                $tag = $data->tags->pluck('name','type','id');
                array_push($tags, $tag);
            }

            //filter result set based on selected district
            $filteredDataset = $dataset->filter(function($data) use ($district_id) {
                if($district_id != null && $data->district_id != $district_id) {
                    return false;
                }
                return true;
            });
            // result filtered based on location further filtered based on sent tags
            $filteredDataset = $filteredDataset->filter(function($data) use ($tag_names) {
                if($tag_names != null) {
                    $dataTags = $data->tags->pluck('name')->toArray();
                    if(count(array_intersect($dataTags, $tag_names)) == 0) {
                        return false;
                    }
                }
                return true;
            });
            
            return response()->json([
                'status'=>200,
                'filteredWhatsOnEvents'=>$filteredDataset,
            ]);
        }

  /** Filter Whats on media and advocacy data by district and tags */
    public function filterWhatsOnMediaAndAdvocacy(Request $body)
        {
            $district_id = $body->input('district');
            $tag_names = $body->input('tags');
            $dataset = WhatsOn::where('type','=',2)->select('*')->get();
            $tags = [];
            foreach($dataset as $data) {
                $tag = $data->tags->pluck('name','type','id');
                array_push($tags, $tag);
            }
            $filteredDataset = $dataset->filter(function($data) use ($district_id) {
                if($district_id != null && $data->district_id != $district_id) {
                    return false;
                }
                return true;
            });

            $filteredDataset = $filteredDataset->filter(function($data) use ($tag_names) {
                if($tag_names != null) {
                    $dataTags = $data->tags->pluck('name')->toArray();
                    if(count(array_intersect($dataTags, $tag_names)) == 0) {
                        return false;
                    }
                }
                return true;
            });
            return response()->json([
                'status'=>200,
                'filteredMediaAndAdvocacy'=>$filteredDataset,
            ]);
        }

  /** Filter Whats on volunteer opportunities data by district and tags */
    public function filterWhatsOnVolunteerOpportunities(Request $body)
        {
            $district_id = $body->input('district');
            $tag_names = $body->input('tags');
            $dataset = WhatsOn::where('type','=',3)->select('*')->get();
            $tags = [];
            foreach($dataset as $data) {
                $tag = $data->tags->pluck('name','type','id');
                array_push($tags, $tag);
            }
            $filteredDataset = $dataset->filter(function($data) use ($district_id) {
                if($district_id != null && $data->district_id != $district_id) {
                    return false;
                }
                return true;
            });

            $filteredDataset = $filteredDataset->filter(function($data) use ($tag_names) {
                if($tag_names != null) {
                    $dataTags = $data->tags->pluck('name')->toArray();
                    if(count(array_intersect($dataTags, $tag_names)) == 0) {
                        return false;
                    }
                }
                return true;
            });
            return response()->json([
                'status'=>200,
                'filteredVolunteerOpportunities'=>$filteredDataset,
            ]);
        }

   public function WhatsOnEventsMap()
    {
        $eventMap = DB::table('project_events_opportunities')->where('type',1)
            ->select('locations', 'title')
            ->get();
        return response()->json([
            'status'=>200,
            'event_map'=>$eventMap
        ]);
    }

   public function WhatsOnMediaAndArticlesMap()
    {
        $mediaMap = DB::table('project_events_opportunities')->where('type',2)
            ->select('locations', 'title')
            ->get();
        return response()->json([
            'status'=>200,
            'media_map'=>$mediaMap
        ]);
    }

   public function WhatsOnOpportunitiesMap()
    {
        $opportunitiesMap = DB::table('project_events_opportunities')->where('type',3)
            ->select('locations', 'title')
            ->get();
        return response()->json([
            'status'=>200,
            'opportunities_map'=>$opportunitiesMap
        ]);
    }

    /** All volunteer opportunities list - Frontend */
    public function ProjectOpportunitiesList()
    {
        $opportunities = DB::table('project_events_opportunities')
            ->select('*')
            ->where('type', 3)
            ->get();

        return response()->json([
            'status'=>200,
            'opportunities'=>$opportunities,
        ]);
    }

    /** All events profile data - Frontend */
    public function EventProfile($slug)
    {
        $profile = DB::table('project_events_opportunities')
            ->select('*')
            ->where('type', 1)
            ->where('slug', $slug)
            ->get();
        $city = DB::table('cities')
            ->select('*')
            ->Where('id', $profile[0]->city_id)
            ->get();
        $district = DB::table('districts')
            ->select('*')
            ->Where('id', $profile[0]->district_id)
            ->get();
        return response()->json([
            'status'=>200,
            'profile'=>$profile,
            'city'=>$city[0],
            'district'=>$district[0],
        ]);
    }

    /** All media and advocacy profile data - Frontend */
    public function MediaAndAdvocacyProfile($slug)
    {
        $profile = DB::table('project_events_opportunities')
            ->select('*')
            ->where('type', 2)
            ->where('slug', $slug)
            ->get();
        $city = DB::table('cities')
            ->select('*')
            ->Where('id', $profile[0]->city_id)
            ->get();
        $district = DB::table('districts')
            ->select('*')
            ->Where('id', $profile[0]->district_id)
            ->get();
        return response()->json([
            'status'=>200,
            'profile'=>$profile,
            'city'=>$city[0],
            'district'=>$district[0],
        ]);
    }

    /** All volunteer opportunity profile data - Frontend */
    public function VolunteerOpportunityProfile($slug)
    {
        $profile = DB::table('project_events_opportunities')
            ->select('*')
            ->where('type', 3)
            ->where('slug', $slug)
            ->get();
        $city = DB::table('cities')
            ->select('*')
            ->Where('id', $profile[0]->city_id)
            ->get();
        $district = DB::table('districts')
            ->select('*')
            ->Where('id', $profile[0]->district_id)
            ->get();
        return response()->json([
            'status'=>200,
            'profile'=>$profile,
            'city'=>$city[0],
            'district'=>$district[0],
        ]);
    }

    /** WhatsOn single page - Frontend */
    public function show($slug)
    {
        $photoList = [];
        $WhatsOn = WhatsOn::where('slug', $slug)->first();
        $tags = $WhatsOn->tags->pluck('name');
        // $photos = json_decode($projects['photos']);
        // foreach($photos as $photo) {
        //     $photo = Fileuploads::where('id', $photo)->first();
        //     array_push($photoList, $photo);
        // }
        if($WhatsOn) {
            return response()->json([
                'status' => 200,
                'get_data' => $WhatsOn,
                'tags' => $tags,
                //'photoList' => $photoList,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No ID found.!',
            ]);
        }
    }

    /** Store a new whats on post - Dashboard */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);
        if($request->type == 1) {$type = 'Event';}
        elseif ($request->type == 2) {$type = 'Media Article';}
        else {$type = 'Volunteer';}

        $organization_id = $request->organization_id == null ? 0 : $request->organization_id;
        $project_id = $request->project_id == null ? 0 : $request->project_id;

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else {
            $wtson = WhatsOn::create([
                'user_id' => Auth::id(),
                'type' => $request->type,
                'title' => $request->title,
                'slug' => strtolower(str_replace(' ', '', $request->title).uniqid()),
                'project_id' => $project_id,
                'organization_id' => $organization_id,
                'start_date_time' => $request->start_date,
                'end_time_time' => $request->end_date,
                'overview' => $request->overview,
                'district_id' => $request->district_id,
                'city_id' => $request->city_id,
                'description' => $request->description,
                'route' => $request->route,
                'locations' => json_encode($request->locations),
                'uploads' => json_encode($request->uploads),
                'photos' => json_encode($request->photos),
            ]);

            $tags = $request->input('tags_thematic');
            $tagsSubject = $request->input('tags_subject');
            $tagsExtra = $request->input('tags_extra');
            $wtson->attachTags($tags, 1);
            $wtson->attachTags($tagsSubject, 2);
            $wtson->attachTags($tagsExtra, 3);

            return response()->json([
                'status' => 200,
                'whatsonid' => $wtson->id,
                'message' => $type.' created successfully.',
            ]);
        }
    }

    /** Whatson list - Dashboard */
    public function whatsonByOrganization(){
        $user_id = Auth::user()->id;
        $whatson = WhatsOn::where('user_id', $user_id)->orderByDesc('created_at')->get();
        return response()->json([
            'status' => 200,
            'get_data' => $whatson
        ]);
    }

    /** Edit Whatson - Dashboard */
    public function edit($id) {
        $data = WhatsOn::where('id', '=', $id)->firstOrFail();
        $photoArray = [];
        $data->images = [];
        if(!($data['uploads'] == 'null')) {
            foreach(JSON_decode($data['uploads']) as $row) {
                array_push($photoArray, $row);
            }
            $data->images = $photoArray;
        }
        $tags[] = $data->tags->pluck('name', 'type');

        if($data) {
            return response()->json([
                'status' => 200,
                'get_data' => $data,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'Data ID found.!',
            ]);
        }
    }

    /** Update whatson - Dashboard */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else {
            //$organization_id = $request->organization_id == null ? 0 : $request->organization_id;
            $project_id = $request->project_id == null ? 0 : $request->project_id;

            $data = WhatsOn::find($id);
            if($data) {
                $data->user_id = Auth::user()->id;
                //$data->organization_id = $organization_id;
                $data->project_id = $project_id;
                $data->slug = strtolower(str_replace(' ', '', $request->title).uniqid());
                $data->type = $request->input('type');
                $data->title = $request->input('title');
                $data->overview = $request->input('overview');
                $data->start_date_time = $request->input('start_date_time');
                $data->end_time_time = $request->input('end_time_time');
                $data->description = $request->input('description');
                $data->route = $request->input('route');
                $data->locations = json_encode($request->locations);
                $data->uploads = json_encode($request->uploads);
                $data->photos = json_encode($request->photos);
                $data->district_id = $request->input('district_id');
                $data->city_id = $request->input('city_id');

                $tagsThematic = $request->input('tags_thematic');
                $tagsSubject = $request->input('tags_subject');
                $tagsExtra = $request->input('tags_extra');
                $data->attachTags($tagsThematic, 1);
                $data->attachTags($tagsSubject, 2);
                $data->attachTags($tagsExtra, 3);

                $data->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Data updated successfully.',
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No project ID found.',
                ]);
            }
        }
    }

    public function delete($id)
    {   
        $post = WhatsOn::find($id);
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
