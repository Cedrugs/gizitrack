<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'distribution_id' => $this->distribution_id,
            'menu' => $this->menu,
            'num_portion' => $this->num_portion,
            'rating' => $this->rating,
            'on_time' => $this->on_time,
            'lateness_time' => $this->lateness_time,
            'message' => $this->message
        ];
    }
}
