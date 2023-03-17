<?php

namespace Database\Seeders;

use App\Models\PageFields;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AboutPageMediaSeeder extends Seeder
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
                'field' => 'main_banner', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'main_description_image', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ],
            [
                'user_id' => 1,
                'template' => 'about',
                'field' => 'our_trustees', 
                'value' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            ]
        ];

        PageFields::insert($fieldList);
    }
}
