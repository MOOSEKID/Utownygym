<?php

namespace App\Models;

use Coderstm\Traits\Core;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ClassList extends Model
{
    use Core;

    protected $fillable = [
        'name',
        'capacity',
        'description',
        'urls',
        'extra',
        'is_active',
        'has_description',
    ];

    protected $casts = [
        'urls' => 'collection',
        'is_active' => 'boolean',
        'has_description' => 'boolean',
        'extra' => 'boolean',
    ];

    public function getDescriptionAttribute($value)
    {
        return $this->has_description || is_admin() ? $value : '';
    }

    public function instructors(): BelongsToMany
    {
        return $this->belongsToMany(Instructor::class, 'instructor_class_lists', 'class_id', 'instructor_id')->withPivot('cost');
    }

    protected static function booted()
    {
        parent::booted();
        static::updated(function ($model) {
            DB::table('class_schedules')
                ->where('class_id', $model->id)
                ->whereNull('sign_off_at')
                ->update(['capacity' => $model->capacity]);
        });
    }
}
