<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Level1Tag;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Classifieds extends Model
{
    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     * Type 1 : Job Advert
     * Type 2 : Grants & RFPs
     * Type 3 : Green / Sustainable Suppliers
     * Type 4 : Resource Pool
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'slug',
        'description',
        'weblink',
        'uploads',
        'district_id',
        'organization_id',
        'city_id',
        'overview',
        'photos',
        'uploads',
        'status'
    ];

    /**
     * One project belongs to one user
     *
     */
    public function user()
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Guest Author',
        ]);
    }

    /**
     * Get all of the tags for the classified.
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Level1Tag::class, 'level1_taggable', 'level1_taggables');
    }
}
