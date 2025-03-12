<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryResource extends JsonResource
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
            'price' => $this->price,
            'menu' => $this->menu,
            'num_portion' => $this->num_portion,
            'date_sent' => $this->date_sent,
            'time_sent' => $this->time_sent,
            'delivery_status' => $this->delivery_status,
        ];
    }
}
