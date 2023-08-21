<?php

namespace App\Http\Controllers;
use App\Models\Tags;
use App\Models\Level1Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagsController extends Controller
{
    public function getLevel1Tags(Request $request)
    {
        $query = Level1Tag::query();
        if ($request->has('level')) {
            $query->where('level', $request->level);
        }
        if ($request->has('parent')) {
            $query->where('parent', $request->parent);
        }
        $tags = $query->orderBy('weight')->get();
        return response()->json([
            'status' => 200,
            'tags' => $tags,
        ]);
    }

    // public function getLevel1Tags(Request $request)
    // {
    //     $where = [
    //         $request->has('level') ? ['level', '=', $request->level]  : false,
    //         $request->has('parent') ? ['parent', '=', $request->parent]  : false
    //     ];
    //     $tags = Level1Tag::where($where)->orderBy('weight')->get();
    //     return response()->json([
    //         'status' => 200,
    //         'tags' => $where,
    //     ]);
    // }

    public function addTag(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => $validator->messages(),
            ]);
        }
        $tag = Level1Tag::create([
            'name' => $request->name,
            'slug' => $this->slugify($request->name),
            'parent' => $request->parent ? $request->parent : 0,
            'weight' => $request->weight ? $request->weight : 0,
            'level' => $request->level,
        ]);
        return response()->json([
            'status' => 200,
            'new' => $tag,
            'tag' => [
                'name' => $request->name,
                'slug' => $this->slugify($request->name),
                'level' => $request->level,
            ],
        ]);
    }

    public function updateTag(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tag_id' => 'required',
            'weight' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => $validator->messages(),
            ]);
        }
        $tag = Level1Tag::find($request->tag_id);
        if (!$tag) {
            return response()->json([
                'status' => 404,
                'tags' => 'Tag ID not found!',
            ]);
        }
        $tag->weight = $request->weight;
        $tag->save();
        return response()->json([
            'status' => 200,
            'message' => 'Tag Updated succcessfully',
            'tags' => $tag,
        ]);
    }

    public function slugify($string)
    {
        return strtolower(
            trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-')
        );
    }

    public function index()
    {
        $tags = Tags::all();
        return response()->json([
            'status' => 200,
            'tags' => $tags,
        ]);
    }

    public function getProjects(Request $request)
    {
        $tag = Level1Tag::find($request->id);
        if (!$tag) {
            return response()->json([
                'status' => 404,
                'tags' => 'Tag ID not found!',
            ]);
        }
        $projects = $tag->projects;
        return response()->json([
            'status' => 200,
            'projects' => $projects,
        ]);
    }

    public function getClassifieds(Request $request)
    {
        $tag = Level1Tag::find($request->id);
        if (!$tag) {
            return response()->json([
                'status' => 404,
                'tags' => 'Tag ID not found!',
            ]);
        }
        $classified = $tag->classifieds;
        return response()->json([
            'status' => 200,
            'classified' => $classified,
        ]);
    }

    public function getL3TagsByL1(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'level1' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => $validator->messages(),
            ]);
        }
        // get the distint l2 parent list from the given l1
        $parents = Level1Tag::where([
            ['level', '=', 2],
            ['parent', '=', $request->level1],
        ])
            ->distinct()
            ->pluck('id');
        // for each parent load 
        $l3Tags = Level1Tag::whereIn('parent', $parents)->orderBy('name')->get();
        return response()->json([
            'status' => 404,
            'tags' => $l3Tags,
        ]);
    }
}
