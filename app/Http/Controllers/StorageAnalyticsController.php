<?php

namespace App\Http\Controllers;
use App\Models\Fileuploads;
use App\Models\User;
use App\Models\Organizations;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        // Sort the result array by storage in descending order
        usort($resultArray, function ($a, $b) {
            return $b['total_storage_mb'] - $a['total_storage_mb'];
        });
        return response()->json([
            'status' => 200,
            'usage' => $resultArray,
        ]);
    }

    /**
     * Return storage usage by all organizations
     */
    public function getStorageUsageByOrganization()
    {
        // Retrieve all organizations
        $organizations = Organizations::all();

        // Initialize storage usage for all organizations
        $organizationsStorageUsage = [];
        $glbalTotal = 0;
        foreach ($organizations as $organization) {
            // $users = $organization->users;
            $users = DB::table('organization_users')
                ->where('organization_id', $organization->id)
                ->get();
            $totalOrganizationStorage = 0;
            $usersStorage = [];

            foreach ($users as $user) {
                $userStorage = 0;
                $fileUploads = Fileuploads::where(
                    'user_id',
                    $user->user_id
                )->get();

                foreach ($fileUploads as $fileUpload) {
                    $filePath = storage_path(
                        'app/public/' . $fileUpload->file_path
                    );
                    if (file_exists($filePath)) {
                        $fileSize = filesize($filePath);
                        $userStorage += $fileSize / (1024 * 1024);
                        $totalOrganizationStorage += $fileSize / (1024 * 1024);
                        $glbalTotal += $fileSize / (1024 * 1024);
                    }
                }
                $userDetails = User::find($user->user_id);
                $usersStorage[] = [
                    'user_id' => $userDetails->id,
                    'name' => $userDetails->name,
                    'email' => $userDetails->email,
                    'total_storage_mb' => $userStorage,
                ];
            }

            $organizationsStorageUsage[] = [
                'organization_id' => $organization->id,
                'name' => $organization->org_name,
                'total_storage_mb' => $totalOrganizationStorage,
                'users' => $usersStorage,
            ];
        }

        // Sort the organizations by total storage in descending order
        usort($organizationsStorageUsage, function ($a, $b) {
            return $b['total_storage_mb'] - $a['total_storage_mb'];
        });

        return response()->json([
            'status' => 200,
            'total' => $glbalTotal,
            'usage_by_organization' => $organizationsStorageUsage,
        ]);
    }

    /**
     * Return the storage usage for a given organization
     */
    public function filterStorageByOrganization(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'organization_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        //Retriew all organizational users;
        $users = DB::table('organization_users')
            ->where('organization_id', $request->organization_id)
            ->get();

        // Initialize storage usage for all organizations
        $organizationsStorageUsage = [];
        $glbalTotal = 0;
        foreach ($users as $user) {
            $userStorage = 0;
            $fileUploads = Fileuploads::where('user_id', $user->user_id)->get();

            foreach ($fileUploads as $fileUpload) {
                $filePath = storage_path(
                    'app/public/' . $fileUpload->file_path
                );
                if (file_exists($filePath)) {
                    $fileSize = filesize($filePath);
                    $userStorage += $fileSize / (1024 * 1024);
                    // $totalOrganizationStorage += $fileSize / (1024 * 1024);
                    $glbalTotal += $fileSize / (1024 * 1024);
                }
            }
            $userDetails = User::find($user->user_id);
            $usersStorage[] = [
                'user_id' => $userDetails->id,
                'name' => $userDetails->name,
                'email' => $userDetails->email,
                'total_storage_mb' => $userStorage,
            ];
        }
        // Sort the organizations by total storage in descending order
        usort($usersStorage, function ($a, $b) {
            return $b['total_storage_mb'] - $a['total_storage_mb'];
        });
        return response()->json([
            'status' => 200,
            'total' => $glbalTotal,
            'user_list' => $usersStorage,
        ]);
    }
}
