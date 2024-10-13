<?php

namespace App\Models;

use App\Models\Questionnaire\Submission;
use Coderstm\Traits\Core;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Questionnaire extends Model
{
    use Core;

    protected $fillable = [
        'name',
        'has_pdf',
        'has_signature',
        'send_email',
        'fields',
        'default',
        'active',
    ];

    protected $logIgnore = ['fields'];

    protected $casts = [
        'fields' => 'json',
        'has_pdf' => 'boolean',
        'has_signature' => 'boolean',
        'send_email' => 'boolean',
        'default' => 'boolean',
        'active' => 'boolean',
    ];

    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    public function duplicate()
    {
        $template = $this->replicate()->fill([
            'name' => "[Duplicate] {$this->name}",
        ]);

        $template->save();

        return $template->fresh();
    }

    public function markAsDefault()
    {
        $this->update(['default' => 1]);

        static::where('id', '<>', $this->id)
            ->update(['default' => 0]);

        return $this;
    }

    public function scopeOnlyActive($query)
    {
        return $query->where('active', 1);
    }
}
