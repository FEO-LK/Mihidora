<?php

namespace App\Models;

use App\Models\Organizations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Districts extends Model
{
    use HasFactory;

    public function Organizations()      
    {
        return $this->hasOne(Organizations::class);
    } 
}



