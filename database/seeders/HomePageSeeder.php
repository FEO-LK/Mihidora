<?php

namespace Database\Seeders;

use App\Models\PageFields;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class HomePageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pages')->insert([
            'user_id' => 1,
            'title' => 'Home',
            'slug' => '',
            'template' => 'home', 
            'status' => 1,
        ]);

        $fieldList = [
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'explore_title', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'project_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'data_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'resource_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' 
            ],
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'elearning_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'whatson_title', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'home',
                'field' => 'banners', 
                'value' => ''
            ]
        ];

        PageFields::insert($fieldList);
    }
}
