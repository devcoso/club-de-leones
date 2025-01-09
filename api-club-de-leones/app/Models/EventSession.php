<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventSession extends Model
{
    use HasFactory;
    protected $table = 'event_sessions';
    protected $fillable = ['user_id', 'event_id', 'participated_at', 'duration', 'notes'];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
