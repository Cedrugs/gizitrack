<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\PemerintahResource;
use App\Models\Delivery;
use App\Models\Distribution;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PemerintahController extends Controller
{
    public function show()
    {
        $deliveries = Delivery::all();
        $feedbacks = Feedback::all();
        // $data->load();
        Log::info('Res:', ['data' => $deliveries]);
        Log::info('Res:', ['data' => $feedbacks]);

        // $school->load(['distributions.delivery', 'distributions.feedback', 'distributions.supplier']);
        // $school->loadCount('distributions');
        return new PemerintahResource([
            'deliveries' => $deliveries,
            'feedbacks' => $feedbacks
        ]);
    }
}
