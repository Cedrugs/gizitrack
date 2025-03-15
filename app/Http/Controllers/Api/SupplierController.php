<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\SupplierResource;
use App\Models\Delivery;
use App\Models\Distribution;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{
    public function show(Supplier $supplier)
    {
        $supplier->load(['distributions.delivery', 'distributions.feedback', 'distributions.supplier', 'distributions.school']);
        $supplier->loadCount('distributions');
        return new SupplierResource($supplier);
    }

    public function store(Request $request)
    {
        Log::info('Data received:', ['data' => $request]);

        try {
            $validatedData = $request->validate([
                'menu' => 'required|string|max:255',
                'num_portion' => 'required|integer|max:255',
                'price' => 'required|integer',
                'date_sent' => 'required|string',
                'time_sent' => 'required|string',
                'school_id' => 'required|integer',
                'supplier_id' => 'required|integer'
            ]);

            Log::info('Data received:', ['data' => $validatedData]);
    
            $distribution = Distribution::create([
                'school_id' => $validatedData['school_id'],
                'supplier_id' => $validatedData['supplier_id']
            ]);

            $data = array_merge(
                $validatedData, 
                [
                    'delivery_status' => 'proses',
                    'distribution_id' => $distribution->id,
                ]
                );

            $delivery = Delivery::create($data);
    
            return response()->json(['message' => 'Feedback submitted successfully.'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed', ['errors' => $e->errors()]);
            
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error inserting feedback: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to save feedback', 'message' => $e->getMessage()], 500);
        }
    }
}
