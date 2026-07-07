<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'geo_name',
        'description',
        'capital',
        'area',
        'population',
        'center_lat',
        'center_lng',
        'scale',
    ];

    protected $casts = [
        'center_lat' => 'float',
        'center_lng' => 'float',
        'scale' => 'integer',
    ];

    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }
}
