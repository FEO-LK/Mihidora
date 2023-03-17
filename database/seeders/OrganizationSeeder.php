<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('organizations')->insert([
            'user_id' => 2,
            'org_name' => 'Non organization record',
            'slug' => 'non-organization-record',
            'org_type' => 1, 
            'org_size' => '1 - 10',
            'description' => 'Test description',
            'reg_number' => '1082342X',
            'email' => 'org@org.org',
            'address' => '-',
            'website' => 'nonorg.org',
            'contact_number' => '+1',
            'contact_person' => 'no one',
            'status' => 1
        ]);

    }
}
