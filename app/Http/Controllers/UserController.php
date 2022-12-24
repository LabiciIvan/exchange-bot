<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function index() 
    {
        $users = User::all();

        return UserResource::collection($users);
    }
    
    public function show(User $user) 
    {
        return new UserResource($user);
    }
    
    public function store(UserCreateRequest $request)
    {
        $user = User::create([
            'is_admin'  => '0',
            'name'      => $request->name, 
            'email'     => $request->email, 
            'password'  => $request->password, 
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return Response::json([
            'token' => $token,
            'user'  => new UserResource($user),
        ]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->fill([
            'is_admin' => $request->is_admin,
        ]);

        $user->save();

        return new UserResource($user);
    }

    public function delete(User $user)
    {
        return Response::json(['message' => 'hi from user store']);
    }
}
