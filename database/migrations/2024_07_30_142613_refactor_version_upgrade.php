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
        if (!Schema::hasColumn('plans', 'slug')) {
            Schema::table('plans', function (Blueprint $table) {
                $table->string('slug')->unique();
                $table->double('price', 12, 2)->default(0.00);
            });

            $this->setAutoIncrement('plans');
        }

        if (!Schema::hasColumn('plan_features', 'feature_id')) {
            Schema::table('plan_features', function (Blueprint $table) {
                $table->foreignIdFor(Feature::class);
            });
        }

        if (Schema::hasColumn('plan_features', 'slug')) {
            Schema::table('plan_features', function (Blueprint $table) {
                $table->dropColumn('slug');
            });
        }

        if (!Schema::hasColumn('orders', 'exchange_rate')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->nullableMorphs('orderable');
                $table->{$this->jsonable()}('options')->nullable();
                $table->string('currency')->nullable();
                $table->double('exchange_rate', 15, 4)->default(1);
            });
        }

        if (!Schema::hasColumn('subscription_invoices', 'exchange_rate')) {
            Schema::table('subscription_invoices', function (Blueprint $table) {
                $table->unsignedBigInteger('user_id')->nullable();
                $table->string('key')->nullable()->unique();
                $table->string('number')->nullable()->unique()->change();
                $table->string('status')->nullable();
                $table->double('exchange_rate', 15, 4)->default(1);
                $table->double('sub_total', 15, 2)->nullable();
                $table->double('tax_total', 15, 2)->nullable();
                $table->double('discount_total', 15, 2)->nullable();
                $table->double('grand_total', 15, 2)->nullable();
                $table->{$this->jsonable()}('billing_address')->nullable();
                $table->boolean('collect_tax')->nullable()->default(false);

                $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            });
        }

        if (!Schema::hasColumn('subscription_invoice_line_items', 'plan_id')) {
            Schema::table('subscription_invoice_line_items', function (Blueprint $table) {
                $table->text('title')->nullable();
                $table->unsignedBigInteger('plan_id')->nullable();
                $table->double('price', 15, 2)->nullable()->default(0);
                $table->double('total', 15, 2)->nullable()->default(0);

                $table->foreign('plan_id')->references('id')->on('plans')->nullOnDelete();
            });
        }

        $this->setAutoIncrement('subscription_invoices');
        $this->setAutoIncrement('subscription_invoice_line_items');
    }
};
