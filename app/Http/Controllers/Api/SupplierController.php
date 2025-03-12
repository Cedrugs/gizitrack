<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\SupplierResource;
use App\Models\Supplier;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{
    public function show(Supplier $supplier)
    {
        $supplier->load(['distributions.delivery', 'distributions.feedback', 'distributions.supplier']);
        $supplier->loadCount('distributions');
        return new SupplierResource($supplier);
    }
}
