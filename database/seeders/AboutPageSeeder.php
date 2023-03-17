<?php

namespace Database\Seeders;

use App\Models\PageFields;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AboutPageSeeder extends Seeder
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
            'title' => 'About',
            'slug' => '',
            'template' => 'about', 
            'status' => 1,
        ]);

        $fieldList = [
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'intro_main_text', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'intro_small_text', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'chart_title', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'chart_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' 
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'main_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'project_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'members_description', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ]
        ];

        PageFields::insert($fieldList);
    }
}
