<?php

namespace App\Models;

use Spatie\Tags\HasTags;
use App\Models\Districts;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Scout\Searchable;
use App\Models\OrganizationUser;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organizations extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasTags; // Searchable

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'org_name',
        'slug',
        'reg_number',
        'email',
        'org_type',
        'org_size',
        'description',
        'address',
        'social_media',
        'website',
        'contact_number',
        'contact_person',
        'linkedin',
        'instagram',
        'district_id',
        'city_id',
        'overview',
        'ongoing',
        'status',
        'uploads',
        'photos',
        'org_logo'
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];


    /**
     * One project belongs to one user
     *
     */
    public function organizationUser()
    {
        return $this->hasMany(OrganizationUser::class, 'organization_id', 'id');
    }

    public function districts()
    {
        return $this->hasOne(Districts::class, 'district_id', 'id');
        // return $this->belongsTo(Districts::class)->withDefault([
        //     'name_en' => '-',
        // ]);
    }
}
