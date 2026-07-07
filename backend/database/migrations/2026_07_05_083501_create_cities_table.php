<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('province');
            $table->string('geo_name');
            $table->string('tagline');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('coordinates'); // JSON stringified array e.g. "[100.6334, -0.2159]"
            $table->integer('scale')->default(3000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
