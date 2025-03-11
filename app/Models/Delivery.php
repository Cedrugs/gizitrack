<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delivery extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'distribution_id',
        'price',
        'menu',
        'num_portion',
        'date_sent',
        'time_sent',
        'delivery_status'
    ];

    public function distribution(): BelongsTo {
        return $this->belongsTo(Distribution::class, 'distribution_id');
    }
}
