<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'assignment';

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    //protected $attributes = [
    //];

    public function assignee()
    {
        return $this->belongsTo('User', 'assignee_id', 'id');
    }

    public function job()
    {
        return $this->belongsTo('Job', 'job_id', 'id');
    }
}