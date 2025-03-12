<?php

namespace App\Http\Resources\Api;

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        Log::info($this->city);
        Log::info('Schools', ['schools' => School::where('city', $this->city)]);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'city' => $this->city,
            'distributions' => DistributionResource::collection($this->whenLoaded('distributions')),
            'eligible_schools' => School::where('city', $this->city)->select('id', 'name', 'address', 'city')->get(),
        ];
    }
}
