<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $table = 'branches';
    protected $fillable = ['name', 'location', 'phone_number'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
