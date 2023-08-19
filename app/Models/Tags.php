<?php

namespace App\Models;

use Spatie\Tags\Tag;
use App\Models\TagType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;


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

    /**
     * Get all of the projects that are assigned this tag.
     */
    public function projects(): MorphToMany
    {
        return $this->morphedByMany(Projects::class, 'taggable');
    }
 
    /**
     * Get all of the classified that are assigned this tag.
     */
    public function classified(): MorphToMany
    {
        return $this->morphedByMany(Classifieds::class, 'taggable');
    }
}
