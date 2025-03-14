<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedback extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'menu' => 'required|string|max:255',
            'num_portion' => 'required|integer|max:255',
            'distribution_id' => 'required|integer',
            'rating' => 'required|string|in:baik,buruk,cukup',
            'on_time' => 'required|boolean',
            'message' => 'string|max:255',
            'lateness_time' => 'nullable|integer',
            'problem' => 'string|max:255'
        ];
    }
}
