<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessCard extends Model
{
    protected $fillable = ['number', 'cardable_type', 'cardable_id'];
}
