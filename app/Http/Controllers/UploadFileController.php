<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadFileController extends Controller
{
    private function storeImage($imageData, $picName, $picBasePath,$disk) {
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
            $imageData = substr($imageData, strpos($imageData, ',') + 1);
            $type = strtolower($type[1]); 

            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new Exception('invalid image type');
            }

            $imageData = base64_decode($imageData);

            if ($imageData === false) {
                throw new Exception('image decode failed');
            }

            $picNameExtension = "{$picName}.{$type}";
            $picFullPath = $picBasePath . $picNameExtension;
            Storage::disk($disk)->put($picFullPath, $imageData);
        } else if (preg_match('/^https/', $imageData)) {
            $imageData = basename($imageData);
            $picFullPath = $picBasePath;
        } else {
            throw new Exception('did not match data URI with image data');
        }

        return $picFullPath;
    }


    public function showUploadFile(Request $request) {

        // $file = $request->file('fotografije');
    
        // //Display File Name just for check or do a dd
        // echo 'File Name: '.$file[0]->getClientOriginalName();
    
        // //Move Uploaded File
        $val = $request->files;
        $destinationPath = 'uploads/';
        $random_words = 'testupload';
        $this->storeImage($val, $random_words, $destinationPath, 'public');
    }
}
