<?php

use Coderstm\Models\Coupon;
use Coderstm\Traits\Helpers;
use Illuminate\Support\Facades\DB;
use Coderstm\Models\Subscription\Plan;
use Illuminate\Support\Facades\Schema;
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

        if (!Schema::hasColumn('subscriptions', 'coupon_id')) {
            Schema::table('subscriptions', function (Blueprint $table) {
                $table->foreignIdFor(Plan::class, 'plan_id')->nullable();
                $table->foreignIdFor(Coupon::class, 'coupon_id')->nullable();
                $table->string('status');
                $table->{$this->jsonable()}('options')->nullable();
                $table->timestamp('starts_at')->nullable();
                $table->timestamp('canceled_at')->nullable();
                $table->string('stripe_id')->nullable()->change();

                $table->foreign('plan_id')->references('id')->on('plans')->cascadeOnUpdate()->nullOnDelete();
                $table->foreign('coupon_id')->references('id')->on('coupons')->cascadeOnUpdate()->nullOnDelete();
            });
        }

        Schema::table('features', function (Blueprint $table) {
            $indexName = 'features_slug_unique';

            // Check if the index exists
            $indexExists = DB::select("SHOW INDEX FROM `features` WHERE Key_name = ?", [$indexName]);

            if (empty($indexExists)) {
                // Add the index if it does not exist
                $table->unique('slug', 'features_slug_unique');
            }
        });

        Schema::create('subscription_usages', function (Blueprint $table) {
            $table->id();

            $table->string('slug');
            $table->integer('used')->unsigned()->default(0);
            $table->unsignedBigInteger('subscription_id');
            $table->dateTime('reset_at')->nullable();

            $table->unique(['slug', 'subscription_id']);
            $table->foreign('subscription_id')->references('id')->on('subscriptions')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('slug')->references('slug')->on('features')->cascadeOnUpdate()->cascadeOnDelete();
        });

        $this->setAutoIncrement('subscription_usages');
    }
};
