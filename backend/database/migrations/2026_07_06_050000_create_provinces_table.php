<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('geo_name');
            $table->text('description')->nullable();
            $table->string('capital')->nullable();
            $table->string('area')->nullable();
            $table->string('population')->nullable();
            $table->decimal('center_lat', 10, 6)->nullable();
            $table->decimal('center_lng', 10, 6)->nullable();
            $table->integer('scale')->default(22000);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
