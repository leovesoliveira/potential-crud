<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    protected $fillable = [
        'name',
        'gender',
        'hobby',
        'birthdate',
    ];

    protected $casts = [
        'id' => 'integer',
        'birthdate' => 'date',
    ];

    protected $appends = [
        'age',
    ];

    public function getAgeAttribute()
    {
        return $this->birthdate->age;
    }

    public function scopeFilter($query, $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->orWhere(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
                $query->orWhere('hobby', 'like', "%{$search}%");
            });
        });

        $query->when($filters['gender'] ?? null, function ($query, $gender) {
            $query->where('gender', '=', $gender);
        });

        return $query;
    }
}
