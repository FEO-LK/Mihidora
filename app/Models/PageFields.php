<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageFields extends Model
{
    use HasFactory;

    protected $fillable = [
        'template',
        'field',
        'value',
        'user_id',
    ];
}
