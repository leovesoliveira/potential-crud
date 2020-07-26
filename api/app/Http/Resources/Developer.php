<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Developer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'gender' => $this->gender,
            'hobby' => $this->hobby,
            'birthdate' => $this->birthdate,
            'age' => $this->age,
        ];
    }
}
