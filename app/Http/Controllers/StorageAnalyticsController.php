<?php

namespace App\Http\Controllers;
use App\Models\Fileuploads;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class StorageAnalyticsController extends Controller
{
    //get storage used by users
    public function getUserCounts()
    {
        // Retrieve the fileuploads data
        $fileUploads = Fileuploads::all();
        // dd($fileUploads);
        // Calculate storage usage for each user
        $usersStorageUsage = [];
        foreach ($fileUploads as $fileUpload) {
            $fullPath = storage_path('app/public/' . $fileUpload->file_path);
            // $filePath = 'storage/app/public/' . $fileUpload->file_path; // Adjust the path as needed

            if (file_exists($fullPath)) {
                // $fileSize = Storage::disk('public')->size($filePath);
                $fileSize = filesize($fullPath);

                if (!isset($usersStorageUsage[$fileUpload->user_id])) {
                    $usersStorageUsage[$fileUpload->user_id] = 0;
                }

                $usersStorageUsage[$fileUpload->user_id] = (int) $fileSize;
            }
        }

        $path = Storage::disk('public');
        // dd($path);
        // Format the results as an array
        $resultArray = [];
        foreach ($usersStorageUsage as $userId => $totalStorage) {
            $resultArray[] = [
                'user_id' => $userId,
                'total_storage' => $totalStorage,
            ];
        }

        return response()->json([
            'status' => 200,
            'usage' => $resultArray,
        ]);
    }

    public function returnAllUserswithFiles()
    {
        // Retrieve the fileuploads data
        $fileUploads = Fileuploads::all();

        // Initialize storage usage for all user IDs
        $usersStorageUsage = [];
        foreach ($fileUploads as $fileUpload) {
            $usersStorageUsage[$fileUpload->user_id] = 0;
        }

        // Calculate storage usage for each user
        foreach ($fileUploads as $fileUpload) {
            // $filePath = 'doc/' . $fileUpload->file_path; // Adjust the path as needed
            $fullPath = storage_path('app/public/' . $fileUpload->file_path);

            if (file_exists($fullPath)) {
                // $fileSize = Storage::disk('public')->size($filePath);
                $fileSize = filesize($fullPath);

                $usersStorageUsage[$fileUpload->user_id] += $fileSize;
            }
        }

        // Format the results as an array
        $resultArray = [];
        foreach ($usersStorageUsage as $userId => $totalStorage) {
            $user = User::find($userId);
            if ($user) {
                // Convert storage from bytes to megabytes (MB)
                $totalStorageMB = round($totalStorage / (1024 * 1024), 2);

                $resultArray[] = [
                    'user_id' => $userId,
                    'name' => $user->name,
                    'email' => $user->email,
                    'total_storage_mb' => $totalStorageMB,
                ];
            }
        }
        return response()->json([
            'status' => 200,
            'usage' => $resultArray,
        ]);
    }
}
