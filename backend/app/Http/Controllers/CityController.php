<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $cities = City::with('categoryItems')->get();
        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|unique:cities',
            'name' => 'required|string',
            'province' => 'required|string',
            'geo_name' => 'required|string',
            'tagline' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'coordinates' => 'required|string',
            'scale' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $city = City::create($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $city
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $city = City::with('categoryItems')->find($id);

        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'City not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $city
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'City not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'slug' => 'sometimes|required|string|unique:cities,slug,' . $id,
            'name' => 'sometimes|required|string',
            'province' => 'sometimes|required|string',
            'geo_name' => 'sometimes|required|string',
            'tagline' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'coordinates' => 'sometimes|required|string',
            'scale' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $city->update($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $city
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'City not found'
            ], 404);
        }

        $city->delete();

        return response()->json([
            'success' => true,
            'message' => 'City deleted successfully'
        ]);
    }
}
