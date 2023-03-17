<?php

namespace App\Http\Controllers;

use Image;
use App\Models\Fileuploads;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class FileuploadController extends Controller
{   
    public function index()
    {
        $user_id = Auth::user()->id;
        $getMediafiles = DB::table('fileuploads')
            ->select('id', 'file_path', 'file_name')
            ->where('user_id', $user_id)
            ->get();

        foreach($getMediafiles as $mediafile) {
            $fileType = explode('.', $mediafile->file_name);
            if( $fileType[1] === 'jpg' || $fileType[1] === 'jpeg' || $fileType[1] === 'png' ) {
                $mediafiles[] = $mediafile;
            } 
        } 

        return response()->json([
            'status'=>200,
            'mediafiles'=>$mediafiles,
        ]);
    }


    public function getMediaDoc()
    {
        $user_id = Auth::user()->id;
        $getMediafiles = DB::table('fileuploads')
            ->select('id', 'file_path', 'file_name')
            ->where('user_id', $user_id)
            ->get();
   
        foreach($getMediafiles as $mediafile) {
            $fileType = explode('.', $mediafile->file_name);
            if( !($fileType[1] === 'jpg') && !($fileType[1] === 'jpeg') && !($fileType[1] === 'png') ) {
                $mediafiles[] = $mediafile;
            } 
        } 

        return response()->json([
            'status'=>200,
            'mediafiles'=>$mediafiles,
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
    public function store(Request $request) // PHOTO UPLOADER
    {   
        $imgIdArray = [];
        $getFile = $request->get('file');
        $getType = $request->get('type');

        $path = storage_path('app/public/');
        $year_folder = $path . date("Y");
        $month_folder = $year_folder . '/' . date("m");

        !file_exists($year_folder) && mkdir($year_folder , 0777);
        !file_exists($month_folder) && mkdir($month_folder, 0777);
        for($x=0; $x < count($getFile); $x++) {
            $file = $getFile[$x];
            $file_name = date('mdYHis') . uniqid() .'.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
            Image::make($file)->save($month_folder.'/'.$file_name);

            $filePath = date("Y").'/'.date("m").'/'.$file_name;
            $fileuploads = fileuploads::create([
                'user_id' => Auth::user()->id,
                'file_name' => $file_name,
                'file_path' => $filePath
            ]);  
            array_push($imgIdArray, $fileuploads);
        }
        return response()->json([
            'status'=>200,
            'imgIds'=>$imgIdArray
        ]);
    }


    public function mediastore(Request $request) // FILE UPLOADER
    {
        $getFile = $request->get('file');
        $getFileName = $request->get('fileName');
        $imgIdArray = [];

        for($x=0; $x < count($getFile); $x++) {
            $file = $getFile[$x];
            $docContent = substr($file, strpos($file, ','));
            $filename = $getFileName; 

            $path = storage_path('app/public/');
            $year_folder = $path . date("Y");
            $month_folder = $year_folder . '/' . date("m");

            !file_exists($year_folder) && mkdir($year_folder , 0777);
            !file_exists($month_folder) && mkdir($month_folder, 0777);
            
            Storage::disk('public')->put($getFileName, base64_decode($docContent));

            $filePath = 'doc/'.$getFileName;
            $fileuploads = fileuploads::create([
                'user_id' => Auth::user()->id,
                'file_name' => $getFileName,
                'file_path' => $filePath
            ]);  
            array_push($imgIdArray, $fileuploads);
            return response()->json([
                'status'=>200,
                'imgIds'=>$imgIdArray
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
        //
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
        //
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