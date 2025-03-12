<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\SchoolResource;
use App\Models\School;

class SchoolController extends Controller
{
    public function show(School $school)
    {
        $school->load(['distributions.delivery', 'distributions.feedback', 'distributions.supplier']);
        $school->loadCount('distributions');
        return new SchoolResource($school);
    }
}
