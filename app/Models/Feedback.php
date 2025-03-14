<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Feedback extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'feedbacks';

    protected $fillable = [
        'menu',
        'num_portion',
        'distribution_id',
        'message',
        'rating',
        'on_time',
        'lateness_time',
        'problem'
    ];

    public function distribution(): BelongsTo {
        return $this->belongsTo(Distribution::class, 'distribution_id');
    }
}
