<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_role',
        'status'
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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * One user can create many projects relationship
     *
     */
    public function projects()      
    {
        return $this->hasMany(Projects::class);
    }

    public function classifieds()      
    {
        return $this->hasMany(Classifieds::class);
    }

    public function Organization()      
    {
        return $this->hasMany(Organization::class);
    }

    public function Events()      
    {
        return $this->hasMany(Events::class);
    }

    public function Data()      
    {
        return $this->hasMany(Data::class);
    }

    public function Education()      
    {
        return $this->hasMany(Education::class);
    } 

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
