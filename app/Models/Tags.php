<?php

namespace App\Models;

use Spatie\Tags\Tag;
use App\Models\TagType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tags extends Tag
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type'
    ];

    public function tag_type() {
        return $this->belongsTo(TagType::class);
    }
}
