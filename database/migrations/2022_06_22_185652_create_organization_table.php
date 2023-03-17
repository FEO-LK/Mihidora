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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('org_name', 200)->fulltext();
            $table->string('slug', 255);
            $table->integer('org_type')->default(0); 
            $table->string('reg_number', 50)->nullable();
            $table->text('description')->fulltext()->nullable(); //fulltext search enabled
            $table->string('org_size', 25)->nullable();
            $table->string('email',100); 
            $table->string('address', 500)->nullable(); 
            $table->json('social_media')->default(new Expression('(JSON_ARRAY())')); // facebook, instagram, linkedin, twitter
            $table->string('website', 100)->nullable();
            $table->string('contact_number', 25)->nullable();
            $table->string('contact_person', 50)->nullable();
            $table->string('contact_nos_hod', 100)->nullable();
            $table->string('contact_name_hod', 100)->nullable();
            $table->string('contact_designation_hod', 50)->nullable();
            $table->string('contact_no_focalpoint', 50)->nullable();
            $table->string('contact_name_focalpoint', 100)->nullable();
            $table->string('contact_designation_focalpoint', 50)->nullable();
            $table->string('contact_nos_focalpoint', 100)->nullable();
            $table->string('contact_email_focalpoint', 100)->nullable();
            $table->string('contact_linkedin_focalpoint')->nullable();
            $table->integer('staffprofile_active_no')->nullable();
            $table->string('staffprofile_percentage_paid_staff', 20)->nullable();
            $table->string('staffprofile_volunteers_no', 50)->nullable();
            $table->string('primary_activities', 255)->nullable();
            // Implementation/ grassroots activity
            // Data collection and research based, with a stronger focus on policy level interventions
            // Communications/advocacy focused/journalism
            // Donor/funding mechanism 
            // Legal and justice based/ Human rights
            // UN-SDGs/ sustainability
            // Design or development  (this can include physical/engineering/ Bio engineering  or IT based)
        
            $table->string('main_delivery_mode', 255)->nullable();
            $table->string('existing_profiles', 255)->nullable();
            $table->json('locations')->default(new Expression('(JSON_ARRAY())')); //type, map, address, contactno1, contactno2, email, description
            $table->integer('district_id')->default(1000); //1000 for nationwide
            $table->integer('city_id')->default(1000);     //1000 for nationwide
            $table->integer('status')->default(2);
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
        Schema::dropIfExists('organizations');
    }
};
