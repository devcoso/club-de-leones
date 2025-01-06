<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserTrainer extends Model
{
    use HasFactory;
    protected $table = 'user_trainer';
    protected $fillable = ['user_id', 'trainer_id', 'status'];
    public $timestamps = false; // Desactiva los timestamps para este modelo


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id', 'id');
    }
}
