<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventManager extends Model
{
    use HasFactory;
    protected $table = 'event_managers';
    protected $fillable = ['user_id', 'event_id', 'type'];
    public $timestamps = false; // Desactiva los timestamps para este modelo


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
