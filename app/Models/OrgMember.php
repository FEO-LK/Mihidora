<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrgMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'organization_id',
        'status',
    ];

    // public function user()      
    // {
    //     return $this->belongsTo(User::class, 'organization_user');
    // }
}
