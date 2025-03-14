<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\SchoolResource;
use App\Models\Feedback;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SchoolController extends Controller
{
    public function show(School $school)
    {
        $school->load(['distributions.delivery', 'distributions.feedback', 'distributions.supplier']);
        $school->loadCount('distributions');
        return new SchoolResource($school);
    }

    public function store(Request $request)
    {
    
        try {
            $validatedData = $request->validate([
                'menu' => 'required|string|max:255',
                'num_portion' => 'required|integer|max:255',
                'distribution_id' => 'required|integer',
                'rating' => 'required|string|in:baik,buruk,cukup',
                'on_time' => 'required|boolean',
                'message' => 'nullable|string|max:255',
                'lateness_time' => 'nullable|integer',
                'problem' => 'nullable|string|max:255',
            ]);
    
            $validatedData['message'] = $validatedData['message'] ?? "";
            $validatedData['problem'] = $validatedData['problem'] ?? "";
    
            Feedback::create($validatedData);
    
            return response()->json(['message' => 'Feedback submitted successfully.'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed', ['errors' => $e->errors()]);
            
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error inserting feedback: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to save feedback'], 500);
        }
    }
}
