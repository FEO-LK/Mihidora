<?php

namespace App\Http\Controllers;
use App\Models\Tags;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    //
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
        $tag = Tags::find($request->id);
        $projects = $tag->projects;
        return response()->json([
            'status' => 200,
            'tag' => $tag,
            'projects' => $projects,
        ]);
    }
}
