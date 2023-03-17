<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert([
            'user_id' => 1,
            'project_title' => 'None',
            'slug' => 'non-project-record',
            'overview' => '', 
            'description' => '1082342X',
            'start_date' => Carbon::now()->format('Y-m-d'),
            'end_date' =>  Carbon::now()->addMonths(5),
           
        ]);
    }
}
