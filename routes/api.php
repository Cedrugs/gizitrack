<?php

use App\Http\Controllers\Api\PemerintahController;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('api_key')->group(function () {
    Route::get('/school/{school:user_id}', [SchoolController::class, 'show']);
    Route::post('/school', [SchoolController::class, 'store']);

    Route::get('/supplier/{supplier:user_id}', [SupplierController::class, 'show']);
    Route::post('/supplier', [SupplierController::class, 'store']);

    Route::get('/pemerintah', [PemerintahController::class, 'show']);
});