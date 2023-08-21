<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('level1_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name', 300)->fulltext();
            $table->text('slug')->unique();
            $table->integer('parent')->default(0);
            $table->integer('weight')->default(0);
            $table->integer('level')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('level1_tags');
    }
};
