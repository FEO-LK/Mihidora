<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_events_opportunities', function (Blueprint $table) {
            $table->string('title', 300)->change();
            $table->json('photos')->default(new Expression('(JSON_ARRAY())'))->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_events_opportunities', function (Blueprint $table) {
            //
        });
    }
};
