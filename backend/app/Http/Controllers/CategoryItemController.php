<?php

namespace App\Http\Controllers;

use App\Models\CategoryItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class CategoryItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categoryItems = CategoryItem::with('city')->get();
        return response()->json([
            'success' => true,
            'data' => $categoryItems
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
            'type' => 'required|string',
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'city_id' => 'required|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $categoryItem = CategoryItem::create($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $categoryItem
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $categoryItem = CategoryItem::with('city')->find($id);

        if (!$categoryItem) {
            return response()->json([
                'success' => false,
                'message' => 'Category item not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $categoryItem
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
        $categoryItem = CategoryItem::find($id);

        if (!$categoryItem) {
            return response()->json([
                'success' => false,
                'message' => 'Category item not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|required|string',
            'name' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'city_id' => 'sometimes|required|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $categoryItem->update($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $categoryItem
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $categoryItem = CategoryItem::find($id);

        if (!$categoryItem) {
            return response()->json([
                'success' => false,
                'message' => 'Category item not found'
            ], 404);
        }

        $categoryItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category item deleted successfully'
        ]);
    }
}
