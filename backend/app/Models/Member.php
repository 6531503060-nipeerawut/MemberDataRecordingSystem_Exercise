<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'prefix', 'first_name', 'last_name', 'birthdate', 'profile_image'
    ];
}
