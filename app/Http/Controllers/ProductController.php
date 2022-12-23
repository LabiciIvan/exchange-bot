<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    public function index() 
    {
        return Response::json(['message' => 'Hi there']);
    }
}
