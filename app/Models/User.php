<?php

namespace App\Models;

use App\Events\UserCreated;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordLink;
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

    protected $dispatchesEvents = [
        'created' => UserCreated::class,
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

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $email = $this->getEmailForPasswordReset();
        // Customize the notification and email sending logic
        $credentials = [
            'email' => $email,
            'token' => $token
        ];
        Mail::to($email)->send(new ResetPasswordLink($credentials));
    }

    /**
     * Get the email address for password reset.
     *
     * @return string
     */
    public function getEmailForPasswordReset()
    {
        return $this->email;
    }
}
