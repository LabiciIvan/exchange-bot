<?php

namespace App\Http\Resources;
use App\Models\User;

use Illuminate\Http\Resources\Json\JsonResource;

/** 
 * @mixin User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'is_admin'  => $this->is_admin,
            'name'      => $this->name,
        ];
    }
}
