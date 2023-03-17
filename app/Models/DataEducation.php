<?php

namespace App\Models;

use Spatie\Tags\HasTags;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Laravel\Scout\Searchable;

class DataEducation extends Model
{
    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable, HasTags; //Searchable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'data_learning_materials';

    protected $fillable = [
        'user_id',
        'organization_id',
        'project_id',
        'title',
        'type',
        'slug',
        'description',
        'uploads',
        'photos',
        'date',
        'district_id',
        'city_id',
        'author',
        'overview',
        'what_you_will_learn',
        'contents',
        'phone',
        'email'
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
}
