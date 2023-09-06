<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    /**
     * Topics
     * projects - Projects
     * data 
     * jobs
     * elearning
     * events
     * jobs
     * grats - Grants & RFPs
     * suppliers
     * resources
     */

    protected $fillable = [
        'user_id',
        'email',
        'topic'
    ];
}
