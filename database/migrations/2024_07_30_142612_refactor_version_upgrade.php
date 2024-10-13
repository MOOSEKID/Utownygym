<?php

use Coderstm\Traits\Helpers;
use Coderstm\Models\Subscription\Plan;
use Illuminate\Support\Facades\Schema;
use Coderstm\Models\Subscription\Feature;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Helpers;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasColumn('plan_features', 'slug')) {
            Schema::table('plan_features', function (Blueprint $table) {
                $table->dropColumn('slug');
            });
        }
    }
};
