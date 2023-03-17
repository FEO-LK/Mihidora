<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        'name',
        'designation',
        'facebook_url',
        'twitter_url', 
        'linkedin_url',
        'status',
    ];
}
