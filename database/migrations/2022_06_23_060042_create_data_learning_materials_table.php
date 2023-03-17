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
        Schema::create('data_learning_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('organization_id')->default(0);   
            $table->foreignId('project_id')->default(0);  
            $table->string('title', 100)->fulltext();
            $table->text('slug');
            $table->tinyInteger('type')->default(1); //1 - data, 2 - e learning
            $table->text('description')->fulltext()->nullable();
            $table->json('uploads')->default(new Expression('(JSON_ARRAY())'))->nullable(); //type - doc/ image, filename, description, author, date, isbn, excerpt
            $table->json('photos')->default(new Expression('(JSON_ARRAY())'))->nullable();
            $table->date('date')->nullable();
            $table->string('author', 100)->nullable();
            $table->string('phone', 12)->nullable();
            $table->string('email', 100)->nullable();
            $table->integer('district_id')->default(0);
            $table->integer('city_id')->default(0);
            $table->timestampsTz();
            $table->softDeletesTz();
        });
    }

    //$table->foreign('created_by_user_id')->references('id')->on('users')->onDelete('cascade');


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_learning_materials');
    }
};
