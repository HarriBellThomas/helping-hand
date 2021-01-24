<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('severity');
            $table->double('longitude', 10, 7);
            $table->double('latitude', 10, 7);
            $table->string('summary');
            $table->string('description');
            $table->string('owner_id');
            $table->bigInteger('created');
            $table->bigInteger('completion_target_1');
            $table->bigInteger('completion_target_2');
            $table->string('status');
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
        Schema::dropIfExists('job');
    }
}
