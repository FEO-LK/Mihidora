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
        Schema::table('data_learning_materials', function (Blueprint $table) {
            $table->json('what_you_will_learn')->default(new Expression('(JSON_ARRAY())'))->nullable();
            $table->json('contents')->default(new Expression('(JSON_ARRAY())'))->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('data_learning_materials', function (Blueprint $table) {
            //
        });
    }
};
