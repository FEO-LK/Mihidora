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
        Schema::create('classifieds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            // $table->foreignId('organization_id');  // project ID 1 - no organization 
            // $table->foreignId('project_id');   // project ID 1 - no project 
            $table->tinyInteger('type')->default(1); // job advertisements (1) grant/donor notifications (2) /RFPs green/sustainable suppliers. (3) Links to other useful websites (4)
            $table->string('title', 100)->fulltext();
            $table->text('slug');
            $table->text('description')->fulltext()->nullable();
            $table->text('weblink')->nullable();
            $table->json('uploads')->default(new Expression('(JSON_ARRAY())'))->nullable(); //type - doc/ image, date, file name
            $table->integer('status')->default(1);
            $table->timestamps();
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
        Schema::dropIfExists('classifieds');
    }
};
