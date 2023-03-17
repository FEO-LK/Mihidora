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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('project_title', 100)->fulltext();
            $table->text('slug');
            $table->string('overview', 200)->nullable();
            $table->text('description')->fulltext()->nullable();
            $table->json('locations')->default(new Expression('(JSON_ARRAY())'));
            $table->json('photos')->default(new Expression('(JSON_ARRAY())'));
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('district_id')->default(1000); //1000 for nationwide
            $table->integer('city_id')->default(1000);     //1000 for nationwide
            
            //documents - save directly in data hub tbl
            $table->json('linked_content')->default(new Expression('(JSON_ARRAY())')); //fkid, type : document, data, elearning, event, resource, vacancy
            //learning material to ‘E Learning” e.g training or study material, links to YouTube videos.
            //Users will upload project events, volunteer ops, media and advocacy to ‘‘What’s on’’
            //Users will upload ‘ Resource Exchange items such as RFQ, Grant profiles, Job descriptions, Request for suppliers etc
            $table->timestampsTz();
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
        Schema::dropIfExists('projects');
    }
};
