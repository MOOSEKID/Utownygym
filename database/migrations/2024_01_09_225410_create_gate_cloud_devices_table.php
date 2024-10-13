<?php

use Illuminate\Support\Str;
use Coderstm\Models\AppSetting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gate_cloud_devices', function (Blueprint $table) {
            $table->id();
            $table->string('serial')->nullable();
            $table->string('model')->nullable();
            $table->string('status')->nullable();
            $table->boolean('active')->nullable()->default(true);
            $table->timestamps();
        });

        AppSetting::create('gatecloud', [
            'wehbook_token' => Str::random(32)
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gate_cloud_devices');
    }
};
