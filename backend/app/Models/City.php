<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'province',
        'geo_name',
        'tagline',
        'description',
        'image',
        'coordinates',
        'scale',
    ];

    protected $casts = [
        'scale' => 'integer',
    ];

    public function categoryItems(): HasMany
    {
        return $this->hasMany(CategoryItem::class);
    }
}
