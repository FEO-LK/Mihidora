<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_events_opportunities', function (Blueprint $table) {
            $table->id();
            $table->timestamps(); 
            $table->foreignId('user_id')->constrained();
            
            $table->foreignId('organization_id');  // project ID 1 - no organization 
            $table->foreignId('project_id');   // project ID 1 - no project 

            $table->tinyInteger('type')->default(1); // events (1), media (2), volunteer (3)
            $table->string('title', 100)->fulltext();
            $table->string('slug', 255);
            $table->string('route', 100)->nullable();
            $table->text('description')->fulltext()->nullable();

            $table->dateTimeTz('start_date_time')->nullable();
            $table->dateTimeTz('end_time_time')->nullable();

            $table->json('uploads')->default(new Expression('(JSON_ARRAY())'))->nullable(); //type - doc/ image, date, file name, file path
            $table->json('locations')->default(new Expression('(JSON_ARRAY())'))->nullable(); //for geojson
            
            $table->integer('district_id')->default(0);
            $table->integer('city_id')->default(0);
            
            $table->softDeletesTz();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_events_opportunities');
    }
};
