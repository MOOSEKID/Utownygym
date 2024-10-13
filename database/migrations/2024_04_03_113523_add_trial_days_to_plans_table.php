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
        if (Schema::hasColumn('plans', 'trial_days')) return;

        Schema::table('plans', function (Blueprint $table) {
            $table->unsignedInteger('trial_days')->nullable()->default(0);
        });
    }
};
