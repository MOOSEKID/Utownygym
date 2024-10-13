<?php

use App\Models\User;
use Coderstm\Database\Factories\AddressFactory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user = User::updateOrCreate([
            'email' => config('coderstm.admin_email', 'admin@example.com'),
        ], [
            'first_name' => 'Admin',
            'last_name' => 'User',
            'phone_number' => config('app.phone'),
            'email_verified_at' => now(),
            'is_free_forever' => true,
            'password' => Hash::make('Gis0ra$$;'),
            'remember_token' => Str::random(10),
            'status' => 'Active',
        ]);

        $user->updateOrCreateAddress(AddressFactory::new()->make()->toArray());
    }
};
