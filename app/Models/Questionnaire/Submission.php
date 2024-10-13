<?php

namespace App\Models\Questionnaire;

use App\Models\User;
use Coderstm\Traits\Logable;
use App\Models\Questionnaire;
use Coderstm\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submission extends Model
{
    use Logable, SerializeDate;

    protected $fillable = [
        'user_id',
        'questionnaire_id',
        'answers',
    ];

    protected $casts = [
        'answers' => 'json',
    ];

    protected $hidden = [
        'user_id',
        'questionnaire_id',
    ];

    protected $with = ['questionnaire'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function questionnaire(): BelongsTo
    {
        return $this->belongsTo(Questionnaire::class);
    }
}
