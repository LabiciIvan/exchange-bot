<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


/**
 * @property string $name
 */
class UserCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'      => 'required|string|min:2',
            'email'     => 'required|email|min:2|unique:users,email',
            'password'  => 'required|string|confirmed',
        ];
    }
}
