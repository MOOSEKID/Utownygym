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
        Schema::table('pages', function (Blueprint $table) {
            $table->binary('data')->nullable()->change();
        });
        Schema::table('page_blocks', function (Blueprint $table) {
            $table->binary('data')->nullable()->change();
        });
        Schema::table('page_templates', function (Blueprint $table) {
            $table->binary('data')->nullable()->change();
        });
    }
};
