<?php

namespace Database\Seeders;

use App\Models\PageFields;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AboutPageTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fieldList = [
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'our_trustees_title', 
                'value' => 'Our Trustees'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'our_team_title', 
                'value' => 'Our Team'
            ]
        ];

        PageFields::insert($fieldList);
    }
}
