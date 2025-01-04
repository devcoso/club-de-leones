<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';
    protected $fillable = [
        'name', 
        'description', 
        'start_date',
        'end_date',
        'sign_up_fee',
        'sign_up_deadline',
        'min_age',
        'max_age',
        'max_participants',
        'branch_id', 
        'type_id',
        'created_by',
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function event_type()
    {
        return $this->belongsTo(EventType::class);
    }
}
