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
     * Tag Structure
     * Table: level1_tags
     * Pivot: level1_taggables
     * Levels
     *  - 1 : level 1 theematic tags
     *  - 2 : level 2 thematic tags
     *  - 3 : level 3 thematic tags
     *  - 4 : level 4 thematic tags
     *  - 10 : Subject tags 
     *  - 11 : Extra Tags
     */

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
