<?php

use Coderstm\Traits\Helpers;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use Helpers;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('orders', 'billing_address')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->{$this->jsonable()}('billing_address')->nullable();
            });
        }

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->string('status')->nullable()->change();
            $table->string('stripe_status')->nullable()->change();
        });

        Schema::table('coupons', function (Blueprint $table) {
            $table->string('stripe_id')->nullable()->change();
            $table->string('promotion_id')->nullable()->change();
        });
    }
};
