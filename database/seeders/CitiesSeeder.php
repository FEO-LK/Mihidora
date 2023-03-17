<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $citiesList = [
            
            [
                'title' => 'Ampara',
            ],
            [
                'title' => 'Anuradhapura',
            ],
            [
                'title' => 'Kandy',
            ],
            [
                'title' => 'Colombo',
            ],
            [
                'title' => 'Gampaha',
            ],
            [
                'title' => 'Kurunegala',
            ],
            [
                'title' => 'Kegalle',
            ],
            [
                'title' => 'Galle',
            ],
            [
                'title' => 'Jaffana',
            ],
            [
                'title' => 'Badulla',
            ],
            [
                'title' => 'Batticaloa',
            ],
            [
                'title' => 'Hambanthota',
            ],
            [
                'title' => 'Kaluthara',
            ],
            [
                'title' => 'Kilinochchi',
            ],
            [
                'title' => 'Mannar',
            ],
            [
                'title' => 'Matale',
            ],
            [
                'title' => 'Moneragala',
            ],
            [
                'title' => 'Mullaitivu',
            ],
            [
                'title' => 'Nuwara Eliya',
            ],
            [
                'title' => 'Polonnaruwa',
            ],
            [
                'title' => 'Puttalam',
            ],
            [
                'title' => 'Ratnapura',
            ],
            [
                'title' => 'Trincomalee',
            ],
            [
                'title' => 'Vavuniya',
            ]

        ];
        DB::table('cities')->insert($citiesList);
    }
}
