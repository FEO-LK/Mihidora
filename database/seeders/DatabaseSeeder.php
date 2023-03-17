<?php

namespace Database\Seeders;

use DB;  use Str; use Hash;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $userList = [
            [
                'name' => Str::random(10),
                'email' => 'test@test.com',
                'user_role' => 0, //super admin
                'status' => 1, //activated
                'password' => Hash::make('test'),
            ],
            [
                'name' => Str::random(10),
                'email' => 'org@org.com',
                'user_role' => 2, //organization
                'status' => 1, //activated
                'password' => Hash::make('test'),
            ]
        ];
        DB::table('users')->insert($userList);

        $this->call([
            OrganizationSeeder::class,
            ProjectSeeder::class,
            OrganizationTypeSeeder::class,
            HomePageSeeder::class,
            AboutPageSeeder::class,
            AboutPageMediaSeeder::class
        ]);
    }
}
