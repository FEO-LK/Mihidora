<?php

namespace App\Models;

use Spatie\Tags\HasTags;
// use Laravel\Scout\Searchable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WhatsOn extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasTags; //Searchable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_events_opportunities'; //table to save the media articles, events and volunteer ops

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'slug',
        'project_id',
        'organization_id',
        'start_date_time',
        'end_time_time',
        'description',
        'route',
        'overview',
        'locations',
        'district_id',
        'city_id',
        'uploads',
        'photos',
    ];

        /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
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
