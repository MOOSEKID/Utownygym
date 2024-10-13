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
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->longText('description')->nullable()->after('email');
            $table->{$this->jsonable()}('urls')->nullable()->after('description');
            $table->boolean('document')->nullable()->default(false)->after('urls');
            $table->boolean('insurance')->nullable()->default(false)->after('document');
            $table->boolean('qualification')->nullable()->default(false)->after('insurance');
            $table->boolean('is_pt')->nullable()->default(false)->after('qualification');
            $table->boolean('is_instructor')->nullable()->default(false)->after('is_pt');
            $table->double('hourspw', 10, 2)->nullable()->default(0.00)->after('is_instructor');
            $table->double('rentpw', 10, 2)->nullable()->default(0.00)->after('hourspw');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('instructors');
    }
};
