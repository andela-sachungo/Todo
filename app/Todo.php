<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = ['title', 'description'];

     /**
     * The attribute that should be mutated to date on softDelete.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}
