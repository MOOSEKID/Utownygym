<?php

use Coderstm\Models\Log;
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
        if (!Schema::hasColumn('logs', 'status')) {
            Schema::table('logs', function (Blueprint $table) {
                $table->string('status')->default(Log::STATUS_SUCCESS)->nullable()->after('type');
            });
        }
    }
};
