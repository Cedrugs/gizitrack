<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Distribution extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'school_id',
        'supplier_id'
    ];

    public function school(): BelongsTo {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function supplier(): BelongsTo {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function delivery(): HasOne {
        return $this->hasOne(Delivery::class, 'distribution_id');
    }

    public function feedback(): HasOne {
        return $this->hasOne(Feedback::class, 'distribution_id');
    }
}
