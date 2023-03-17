<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Districts;

class DistrictsController extends Controller
{
    /** All districts list - Frontend */
    public function index() 
    {
        $districts = Districts::all();
        return response()->json([
            'status'=>200,
            'districts'=>$districts
        ]);
    }

}
