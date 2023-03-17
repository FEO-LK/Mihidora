<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use Illuminate\Http\Request;

class CitiesController extends Controller
{
    /** All districts list - Frontend */
    public function index() 
    {
        $cities = Cities::select("*")->orderBy('name_en', 'asc')->get();

        return response()->json([
            'status'=>200,
            'cities'=>$cities
        ]);
    }
}
