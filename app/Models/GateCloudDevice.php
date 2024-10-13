<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GateCloudDevice extends Model
{
    protected $fillable = [
        'serial',
        'model',
        'status',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
