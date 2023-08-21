<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Level1Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent',
        'slug',
        'level'
    ];

    /**
     * Get all of the projects that are assigned this tag.
     */
    public function projects():MorphToMany
    {
        return $this->morphedByMany(Projects::class, 'level1_taggable', 'level1_taggables');
    }
 
    /**
     * Get all of the Classifieds that are assigned this tag.
     */
    public function classifieds():MorphToMany
    {
        return $this->morphedByMany(Classifieds::class, 'level1_taggable', 'level1_taggables');
    }
}
