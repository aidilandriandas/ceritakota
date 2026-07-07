<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CategoryItemController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\Api\Auth\LoginController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication Routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [LoginController::class, 'me'])->middleware('auth:sanctum');

// API Routes for Provinces
Route::apiResource('provinces', ProvinceController::class);

// API Routes for Cities
Route::apiResource('cities', CityController::class);

// API Routes for Category Items
Route::apiResource('category-items', CategoryItemController::class);
