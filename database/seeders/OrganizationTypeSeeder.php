<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;
use App\Models\OrganizationType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrganizationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrganizationType::truncate();
        $OrgTypes = [
            [
                'user_id' => 1,
                'type' => 'CSO/NGO',
                'status' => 1, 
            ],
            [
                'user_id' => 1,
                'type' => 'Academia',
                'status' => 1, 
            ],
            [
                'user_id' => 1,
                'type' => 'Research Institution',
                'status' => 1, 
            ],
            [
                'user_id' => 1,
                'type' => 'Private sector',
                'status' => 1, 
            ],
            [
                'user_id' => 1,
                'type' => 'Media',
                'status' => 1, 
            ],
            [
                'user_id' => 1,
                'type' => 'Donor',
                'status' => 1, 
            ]
        ];

        OrganizationType::insert($OrgTypes);
    }
}
