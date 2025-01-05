<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    const TYPE_MAP = [
        1 => 'Miembro',
        2 => 'Administrador',
        3 => 'Instructor',
    ];

    const SEX_MAP = [
        1 => 'Masculino',
        2 => 'Femenino',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'paternal_last_name',
        'maternal_last_name',
        'birthdate',
        'sex',
        'phone_number',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'full_name',
        'type',
        'sex_name',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->name} {$this->paternal_last_name} {$this->maternal_last_name}";
    }

    /**
     * Get the user's type.
    */
    public function getTypeAttribute(): string
    {
        return self::TYPE_MAP[$this->user_type] ?? 'Sin tipo';
    }

    /**
     * Get the user's sex.
    */
    public function getSexNameAttribute(): string
    {
        return self::SEX_MAP[$this->sex] ?? 'Sin sexo';
    }


    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function events(){
        return $this->belongsToMany(Event::class, 'event_managers', 'user_id', 'event_id');
    }

    public function getPublicDataAttribute()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'paternal_last_name' => $this->paternal_last_name,
            'maternal_last_name' => $this->maternal_last_name,
            'type' => $this->type
        ];
    }
}
