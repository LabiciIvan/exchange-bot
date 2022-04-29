<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{

    protected $fillable = ['content'];

    use HasFactory;

    public function products() {
        return $this->belongsTo('App\Models\Products');
    }
}
