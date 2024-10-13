<?php

use Coderstm\Enum\AppStatus;
use Coderstm\Traits\Helpers;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Helpers;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable()->after('id');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('gender')->nullable()->after('last_name');
            $table->string('phone_number')->nullable()->after('email');
            $table->boolean('is_active')->nullable()->default(true)->after('phone_number');
            $table->string('status')->nullable()->after('is_active')->default(AppStatus::ACTIVE);
            $table->string('member_id')->nullable()->after('password');
            $table->string('interest', 500)->nullable()->after('password');
            $table->integer('type')->unsigned()->nullable()->after('password');
            $table->string('best_time_contact')->nullable()->after('password');
            $table->string('source')->nullable()->after('password');
            $table->string('referal_code')->nullable()->after('password');
            $table->unsignedBigInteger('admin_id')->nullable()->after('password');
            $table->integer('assign')->unsigned()->nullable()->after('password');
            $table->dateTime('enq_date')->nullable()->after('password');
            $table->dateTime('status_change_at')->nullable()->after('password');
            $table->boolean('checked')->nullable()->default(false)->after('password');
            $table->boolean('request_parq')->nullable()->default(false)->after('password');
            $table->boolean('request_avatar')->nullable()->default(false);
            $table->dateTime('deactivates_at')->nullable()->after('email_verified_at');
            $table->dateTime('release_at')->nullable()->after('deactivates_at');
            $table->boolean('email_marketing')->nullable()->default(false)->after('email_verified_at');
            $table->boolean('collect_tax')->nullable()->default(true)->after('email_marketing');
            $table->bigInteger('qrcode')->nullable()->unique()->after('phone_number');
            $table->string('rag')->nullable()->after('qrcode');
            $table->string('rfid')->nullable()->after('qrcode');
            $table->text('note')->nullable()->after('rfid');

            $table->foreign('admin_id')->references('id')->on('admins')->cascadeOnUpdate()->nullOnDelete();
            $table->softDeletes();
        });

        $this->setAutoIncrement('users');
    }
};
