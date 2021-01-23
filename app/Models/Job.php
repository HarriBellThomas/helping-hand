<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'created' => 0,
        'completion_target_1' => 0,
        'completion_target_2' => 0
    ];
}