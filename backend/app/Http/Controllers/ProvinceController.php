<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProvinceController extends Controller
{
    /**
     * Get all provinces
     */
    public function index(): JsonResponse
    {
        try {
            $provinces = Province::orderBy('name', 'asc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $provinces,
                'message' => 'Provinces retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve provinces: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get province by slug
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $province = Province::where('slug', $slug)->firstOrFail();
            
            return response()->json([
                'success' => true,
                'data' => $province,
                'message' => 'Province retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Province not found: ' . $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Create new province
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|unique:provinces',
                'capital' => 'nullable|string',
                'description' => 'nullable|string',
                'area' => 'nullable|string',
                'population' => 'nullable|string',
                'center_lat' => 'nullable|numeric',
                'center_lng' => 'nullable|numeric',
                'scale' => 'nullable|integer',
            ]);

            $province = Province::create([
                'name' => $validated['name'],
                'slug' => str()->slug($validated['name']),
                'geo_name' => strtoupper($validated['name']),
                'capital' => $validated['capital'] ?? $validated['name'],
                'description' => $validated['description'] ?? "Provinsi {$validated['name']}",
                'area' => $validated['area'] ?? 'Menunggu Data',
                'population' => $validated['population'] ?? 'Menunggu Data',
                'center_lat' => $validated['center_lat'] ?? 0,
                'center_lng' => $validated['center_lng'] ?? 0,
                'scale' => $validated['scale'] ?? 22000,
            ]);

            return response()->json([
                'success' => true,
                'data' => $province,
                'message' => 'Province created successfully',
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create province: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update province
     */
    public function update(Request $request, Province $province): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|unique:provinces,name,' . $province->id,
                'capital' => 'nullable|string',
                'description' => 'nullable|string',
                'area' => 'nullable|string',
                'population' => 'nullable|string',
                'center_lat' => 'nullable|numeric',
                'center_lng' => 'nullable|numeric',
                'scale' => 'nullable|integer',
            ]);

            if (isset($validated['name'])) {
                $validated['slug'] = str()->slug($validated['name']);
                $validated['geo_name'] = strtoupper($validated['name']);
            }

            $province->update($validated);

            return response()->json([
                'success' => true,
                'data' => $province,
                'message' => 'Province updated successfully',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update province: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete province
     */
    public function destroy(Province $province): JsonResponse
    {
        try {
            $province->delete();

            return response()->json([
                'success' => true,
                'message' => 'Province deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete province: ' . $e->getMessage(),
            ], 500);
        }
    }
}
