<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DistributionResource extends JsonResource
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
            'supplier' => $this->whenLoaded('supplier', function () {
                return [
                    'id' => $this->supplier->id,
                    'name' => $this->supplier->name,
                    'address' => $this->supplier->address,
                    'city' => $this->supplier->city
                ];
            }),
            'delivery' => new DeliveryResource($this->whenLoaded('delivery')),
            'feedback' => new FeedbackResource($this->whenLoaded('feedback')),
        ];
    }
}
