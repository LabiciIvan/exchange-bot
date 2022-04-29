<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = ['name', 'stock', 'price'];
    

    public function review() {
        
        return $this->hasMany('App\Models\Review');
    }
    use HasFactory;
}
