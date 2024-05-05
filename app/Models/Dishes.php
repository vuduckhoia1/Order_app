<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Dishes extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'dishes';

}
