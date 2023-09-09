<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\Projects;
use Spatie\Tags\Tag;
use App\Models\Districts;
use Illuminate\Http\Request;
use App\Models\DataEducation;
use App\Models\Organizations;
use App\Models\OrganizationType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DataEducationController extends Controller
{
    public function index()
    {
        $dataset = DataEducation::select('*')->get();
        $tags = [];
        foreach ($dataset as $data) {
            $tag = $data->tags->pluck('name');
            array_push($tags, $tag);
        }
        return response()->json([
            'status' => 200,
            'get_data' => $dataset,
            'tags' => $tags,
        ]);
    }

    public function getDataEducationList(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => $validator->messages(),
            ]);
        }
        $type = $request->type;
        $results = [];
        if ($request->has('take')) {
            $results = DataEducation::where('type', $type)->skip($request->skip)
                ->take($request->take)
                ->with('tags')
                ->orderByRaw('created_at DESC')
                ->get();
            return response()->json([
                'status' => 200,
                'count' => count($results),
                'projects' => $results,
            ]);
        }
        $results = DataEducation::where('type', $type)->orderByRaw('created_at DESC')->get();
        $results->load('tags');
        return response()->json([
            'status' => 200,
            'count' => count($results),
            'results' => $results,
        ]);
    }

    /** Filter datahub by district and tags */
    public function filterDatahub(Request $body)
    {
        $district_id = $body->input('district');
        $tag_names = $body->input('tags');
        $dataset = DataEducation::where('type', '=', 1)
            ->select('*')
            ->get();
        $tags = [];
        foreach ($dataset as $data) {
            $tag = $data->tags->pluck('name', 'type', 'id');
            array_push($tags, $tag);
        }
        $filteredDataset = $dataset->filter(function ($data) use (
            $district_id
        ) {
            if ($district_id != null && $data->district_id != $district_id) {
                return false;
            }
            return true;
        });

        $filteredDataset = $filteredDataset->filter(function ($data) use (
            $tag_names
        ) {
            if ($tag_names != null) {
                $dataTags = $data->tags->pluck('name')->toArray();
                if (count(array_intersect($dataTags, $tag_names)) == 0) {
                    return false;
                }
            }
            return true;
        });

        $ProjectDistricts = [];
        foreach ($filteredDataset as $job) {
            $ProjectDistrict = Districts::select('name_en')
                ->where('id', $job->district_id)
                ->first();
            array_push($ProjectDistricts, $ProjectDistrict);
        }

        return response()->json([
            'status' => 200,
            'filteredDatahub' => $filteredDataset,
            'locations' => $ProjectDistricts,
        ]);
    }

    //for data-hub-list view
    public function DataList()
    {
        $dataset = DB::table('data_learning_materials')
            ->select('*')
            ->get();

        return response()->json([
            'status' => 200,
            'get_data' => $dataset,
        ]);
    }

    /** DataHubItem single page - Frontend */
    public function DataHubItem($slug)
    {
        //load DataItem
        $DataItem = DataEducation::where('slug', $slug)->first();
        $DataItemCity = Cities::select('name_en')
            ->where('id', $DataItem->city_id)
            ->first();
        $DataItemDistrict = Districts::select('name_en')
            ->where('id', $DataItem->district_id)
            ->first();

        if ($DataItemCity == null) {
            $city = 339;
        } else {
            $city = $DataItemCity;
        }
        if ($DataItemDistrict == null) {
            $district = 26;
        } else {
            $district = $DataItemDistrict;
        }

        //load DataItem Organisation
        $organization = Organizations::select(
            'org_name',
            'slug',
            'org_type',
            'city_id'
        )
            ->where('id', $DataItem->organization_id)
            ->first();
        if ($organization == null or $organization->city_id == null) {
            $organizationCity = Cities::select('name_en')
                ->where('id', 340)
                ->first(); //id 340 = none
            $organizationType = '-';
        } else {
            $organizationCity = Cities::select('name_en')
                ->where('id', $organization->city_id)
                ->first();
            $organizationType = OrganizationType::select('type')
                ->where('id', $organization->org_type)
                ->first();
        }

        if ($organizationCity == null || $organizationCity == 'none') {
            $Orgdistrict = 1;
        } else {
            $Orgdistrict = $organizationCity;
        }

        //load tags
        $tags = $DataItem->tags->pluck('name');

        //load photos
        $photoArray = [];
        $DataItem->images = [];
        if (!($DataItem['photos'] == 'null')) {
            foreach (JSON_decode($DataItem['photos']) as $row) {
                array_push($photoArray, $row);
            }
            $DataItem->images = $photoArray;
        }

        //load files
        $fileArray = [];
        $DataItem->files = [];
        if (!($DataItem['uploads'] == 'null')) {
            foreach (JSON_decode($DataItem['uploads']) as $row) {
                array_push($fileArray, $row);
            }
            $DataItem->files = $fileArray;
        }

        if ($DataItem) {
            return response()->json([
                'status' => 200,
                'get_data' => $DataItem,
                'tags' => $tags,
                'project_org' => $organization,
                'data_city' => $city,
                'data_district' => $district,
                'organization_city' => $Orgdistrict,
                'organization_type' => $organizationType,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No data item found.!',
            ]);
        }
    }

    /** Filter elearning data by district and tags */
    public function filterELearningData(Request $body)
    {
        $district_id = $body->input('district');
        $tag_names = $body->input('tags');
        $dataset = DataEducation::where('type', '=', 2)
            ->select('*')
            ->get();
        $tags = [];
        foreach ($dataset as $data) {
            $tag = $data->tags->pluck('name', 'type', 'id');
            array_push($tags, $tag);
        }
        $filteredDataset = $dataset->filter(function ($data) use (
            $district_id
        ) {
            if ($district_id != null && $data->district_id != $district_id) {
                return false;
            }
            return true;
        });

        $filteredDataset = $filteredDataset->filter(function ($data) use (
            $tag_names
        ) {
            if ($tag_names != null) {
                $dataTags = $data->tags->pluck('name')->toArray();
                if (count(array_intersect($dataTags, $tag_names)) == 0) {
                    return false;
                }
            }
            return true;
        });
        return response()->json([
            'status' => 200,
            'filteredELearningData' => $filteredDataset,
        ]);
    }

    /** All e learning material profile data - Frontend */
    public function ELearningMaterialProfile($slug)
    {
        $profile = DataEducation::where('slug', $slug)->first();
        //dd($profile);
        $projectCity = Cities::select('name_en')
            ->where('id', $profile->city_id)
            ->first();
        $ProjectDistrict = Districts::select('name_en')
            ->where('id', $profile->district_id)
            ->first();

        $tags = $profile->tags->pluck('name');

        if ($projectCity == null) {
            $city = 1;
        } else {
            $city = $projectCity;
        }
        if ($ProjectDistrict == null) {
            $district = 1;
        } else {
            $district = $ProjectDistrict;
        }

        return response()->json([
            'status' => 200,
            'profile' => $profile,
            'city' => $city,
            'tags' => $tags,
            'district' => $district,
        ]);
    }

    /** Organization profile dataset list - Frontend */
    public function organizationProfileDatasetList($org_slug)
    {
        $org = Organizations::select('user_id')
            ->where('slug', $org_slug)
            ->first();
        $dataset = DB::table('data_learning_materials')
            ->select('*')
            ->where('user_id', $org->user_id)
            ->get();

        return response()->json([
            'status' => 200,
            'dataset' => $dataset,
        ]);
    }

    //     /** All the data learning materials - Frontend */
    //     public function dataLearningMaterials()
    //     {
    //         $materials = DB::table('data_learning_materials')
    //             ->select('*')
    //             ->get();
    //
    //         return response()->json([
    //             'status'=>200,
    //             'materials'=>$materials,
    //         ]);
    //     }

    /** Dataset single page - Frontend */
    public function show($slug)
    {
        $photoList = [];
        $dataset = DataEducation::where('slug', $slug)->first();
        $tags = $dataset->tags->pluck('name');
        // $photos = json_decode($projects['photos']);
        // foreach($photos as $photo) {
        //     $photo = Fileuploads::where('id', $photo)->first();
        //     array_push($photoList, $photo);
        // }
        if ($dataset) {
            return response()->json([
                'status' => 200,
                'get_data' => $dataset,
                'tags' => $tags,
                //'photoList' => $photoList,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No project ID found.!',
            ]);
        }
    }

    /** Add new dataset - Dashboard TYPE - 1 */
    public function storeData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        $organization_id =
            $request->organization_id == null ? 0 : $request->organization_id;
        $project_id = $request->project_id == null ? 0 : $request->project_id;

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            //dd($request->contents);
            $data = DataEducation::create([
                'user_id' => Auth::user()->id,
                'organization_id' => $organization_id,
                'project_id' => $project_id,
                'title' => $request->title,
                'slug' => strtolower(
                    str_replace(' ', '', $request->title) . uniqid()
                ),
                'type' => $request->type,
                'description' => $request->description,
                'uploads' => json_encode($request->uploads),
                'photos' => json_encode($request->photos),
                //'what_you_will_learn' => json_encode($request->what_you_will_learn),
                'contents' => json_encode($request->contents),
                'district_id' => $request->district_id,
                'city_id' => $request->city_id,
                'date' => $request->date,
                'overview' => $request->overview,
                'author' => $request->author,
                'phone' => $request->phone,
                'email' => $request->email,
            ]);

            $tags = $request->input('tags_thematic');
            $tagsSubject = $request->input('tags_subject');
            $tagsExtra = $request->input('tags_extra');
            $data->attachTags($tags, 1);
            $data->attachTags($tagsSubject, 2);
            $data->attachTags($tagsExtra, 3);

            return response()->json([
                'status' => 200,
                'message' => $request->title . ' successfully added.',
            ]);
        }
    }

    public function storeEducation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        $organization_id =
            $request->organization_id == null ? 0 : $request->organization_id;
        $project_id = $request->project_id == null ? 0 : $request->project_id;

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            //dd($request->contents);
            $data = DataEducation::create([
                'user_id' => Auth::user()->id,
                'organization_id' => $organization_id,
                'project_id' => $project_id,
                'title' => $request->title,
                'slug' => strtolower(
                    str_replace(' ', '', $request->title) . uniqid()
                ),
                'type' => $request->type,
                'description' => $request->description,
                'uploads' => json_encode($request->uploads),
                'photos' => json_encode($request->photos),
                'what_you_will_learn' => json_encode(
                    $request->what_you_will_learn
                ),
                'contents' => json_encode($request->contents),
                'district_id' => 1,
                'city_id' => 1,
                'date' => $request->date,
                'overview' => $request->overview,
                'author' => $request->author,
                'phone' => $request->phone,
                'email' => $request->email,
            ]);

            $tags = $request->input('tags_thematic');
            $tagsSubject = $request->input('tags_subject');
            $tagsExtra = $request->input('tags_extra');
            $data->attachTags($tags, 1);
            $data->attachTags($tagsSubject, 2);
            $data->attachTags($tagsExtra, 3);

            return response()->json([
                'status' => 200,
                'message' => $request->title . ' successfully added.',
            ]);
        }
    }

    /** Edit dataset - Dashboard */
    public function editData(DataEducation $dataEducation, $id)
    {
        $data = DataEducation::where('id', '=', $id)->firstOrFail();
        $photoArray = [];
        $uploadArray = [];
        if (!($data['photos'] == 'null')) {
            foreach (JSON_decode($data['photos']) as $row) {
                array_push($photoArray, $row);
            }
            $data->photos = $photoArray;
        }
        if (!($data['uploads'] == 'null')) {
            foreach (JSON_decode($data['uploads']) as $row) {
                array_push($uploadArray, $row);
            }
            $data->uploads = $uploadArray;
        }
        $tags[] = $data->tags->pluck('name', 'type');

        if ($data) {
            return response()->json([
                'status' => 200,
                'get_data' => $data,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No ID found.!',
            ]);
        }
    }

    /** Edit education - Dashboard */
    public function editEducation(DataEducation $dataEducation, $id)
    {
        $data = DataEducation::where('id', '=', $id)->firstOrFail();
        $photoArray = [];
        $uploadArray = [];
        if (!($data['photos'] == 'null')) {
            foreach (JSON_decode($data['photos']) as $row) {
                array_push($photoArray, $row);
            }
            $data->photos = $photoArray;
        }
        if (!($data['uploads'] == 'null')) {
            foreach (JSON_decode($data['uploads']) as $row) {
                array_push($uploadArray, $row);
            }
            $data->uploads = $uploadArray;
        }
        $tags[] = $data->tags->pluck('name', 'type');

        if ($data) {
            return response()->json([
                'status' => 200,
                'get_data' => $data,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No ID found.!',
            ]);
        }
    }

    /** Update dataset - Dashboard */
    public function updateData(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            //$organization_id = $request->organization_id == null ? 0 : $request->organization_id;
            $project_id =
                $request->project_id == null ? 0 : $request->project_id;

            $dataEdu = DataEducation::find($id);
            if ($dataEdu) {
                $dataEdu->user_id = Auth::user()->id;
                //$dataEdu->organization_id = $organization_id;
                $dataEdu->project_id = $project_id;
                $dataEdu->title = $request->title;
                $dataEdu->slug = strtolower(
                    str_replace(' ', '', $request->title) . uniqid()
                );
                $dataEdu->type = $request->input('type');
                $dataEdu->description = $request->input('description');
                $dataEdu->uploads = json_encode($request->uploads);
                $dataEdu->photos = json_encode($request->photos);
                $dataEdu->date = $request->input('date');
                $dataEdu->district_id = $request->input('district_id');
                $dataEdu->city_id = $request->input('city_id');
                $dataEdu->overview = $request->input('overview');
                $dataEdu->author = $request->input('author');
                $dataEdu->phone = $request->input('phone');
                $dataEdu->email = $request->input('email');

                $tagsThematic = $request->input('tags_thematic');
                $tagsSubject = $request->input('tags_subject');
                $tagsExtra = $request->input('tags_extra');
                $dataEdu->attachTags($tagsThematic, 1);
                $dataEdu->attachTags($tagsSubject, 2);
                $dataEdu->attachTags($tagsExtra, 3);

                $dataEdu->save();
                return response()->json([
                    'status' => 200,
                    'message' => $request->title . ' successfully updated.',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No ID found.',
                ]);
            }
        }
    }

    /** Update education - Dashboard */
    public function updateEducation(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            //$organization_id = $request->organization_id == null ? 0 : $request->organization_id;
            $project_id =
                $request->project_id == null ? 0 : $request->project_id;

            $dataEdu = DataEducation::find($id);
            if ($dataEdu) {
                $dataEdu->user_id = Auth::user()->id;
                //$dataEdu->organization_id = $organization_id;
                $dataEdu->project_id = $project_id;
                $dataEdu->title = $request->title;
                $dataEdu->slug = strtolower(
                    str_replace(' ', '', $request->title) . uniqid()
                );
                $dataEdu->type = $request->input('type');
                $dataEdu->description = $request->input('description');
                $dataEdu->uploads = json_encode($request->uploads);
                $dataEdu->photos = json_encode($request->photos);
                $dataEdu->date = $request->input('date');
                $dataEdu->district_id = 1;
                $dataEdu->city_id = 1;
                $dataEdu->overview = $request->input('overview');
                $dataEdu->author = $request->input('author');
                $dataEdu->phone = $request->input('phone');
                $dataEdu->email = $request->input('email');
                $dataEdu->what_you_will_learn = json_encode(
                    $request->input('what_you_will_learn')
                );
                $dataEdu->contents = json_encode($request->input('contents'));

                $tagsThematic = $request->input('tags_thematic');
                $tagsSubject = $request->input('tags_subject');
                $tagsExtra = $request->input('tags_extra');
                $dataEdu->attachTags($tagsThematic, 1);
                $dataEdu->attachTags($tagsSubject, 2);
                $dataEdu->attachTags($tagsExtra, 3);

                $dataEdu->save();
                return response()->json([
                    'status' => 200,
                    'message' => $request->title . ' successfully updated.',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No ID found.',
                ]);
            }
        }
    }

    /** DataHub list by org - Dashboard */
    public function datahubByOrganization()
    {
        $user_id = Auth::user()->id;
        $dataHub = DB::table('data_learning_materials')
            ->select('id', 'title', 'slug', 'type', 'author')
            ->where('user_id', $user_id)
            ->where('type', 1)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'status' => 200,
            'get_data' => $dataHub,
        ]);
    }

    /** Elearning list by org - Dashboard */
    public function elearningByOrganization()
    {
        $user_id = Auth::user()->id;
        $dataHub = DB::table('data_learning_materials')
            ->select('id', 'title', 'slug', 'type', 'author')
            ->where('user_id', $user_id)
            ->where('type', 2)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'status' => 200,
            'get_data' => $dataHub,
        ]);
    }

    public function delete($id)
    {
        //dd($id);
        $post = DataEducation::find($id);
        if ($post) {
            $post->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Record deleted',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No ID found.',
            ]);
        }
    }
}
