<?php

namespace App\Models;

use Coderstm\Models\Admin as Model;
use Database\Factories\AdminFactory;

class Admin extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'is_supper_admin',
        'is_instructor',
        'is_active',
        'rfid',
    ];

    protected $appends = [
        'name',
        'guard',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'is_instructor' => 'boolean',
        'is_supper_admin' => 'boolean',
    ];

    public static function getMappedAttributes(): array
    {
        return  [
            "First Name" => 'first_name',
            "Surname" => 'last_name',
            "Gender" => 'gender',
            "Email Address" => 'email',
            "Phone Number" => 'phone_number',
            "Status" => 'status',
            "Is Instructor" => 'is_instructor',
            "Password" => 'password',
            "Created At" => 'created_at',
            "Address Line1" => 'line1',
            "Address Line2" => 'line2',
            "Country" => 'country',
            "State" => 'state',
            "State Code" => 'state_code',
            "City" => 'city',
            "Postcode/Zip" => 'postal_code',
        ];
    }

    /**
     * Create a new factory instance for the model.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    protected static function newFactory()
    {
        return AdminFactory::new();
    }
}
