<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventType;

class EventTypeController extends Controller
{
    function index() {
        $categories = EventType::all();

        return response()->json([
            'categories' => $categories
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        $category = EventType::create($request->all());

        return response()->json([
            'message' => 'Category created',
            'category' => $category
        ], 201);
    }

    public function show($id) {
        $category = EventType::find($id);

        if ($category) {
            return response()->json([
                'category' => $category
            ]);
        }

        return response()->json([
            'message' => 'Category not found'
        ], 404);
    }

    public function update(Request $request, $id) {
        $category = EventType::find($id);

        if ($category) {
            $request->validate([
                'name' => 'required',
                'description' => 'required'
            ]);

            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();

            return response()->json([
                'message' => 'Category updated',
                'category' => $category
            ]);
        }

        return response()->json([
            'message' => 'Category not found'
        ], 404);
    }

    public function destroy($id) {
        $category = EventType::find($id);

        if ($category) {
            $category->delete();

            return response()->json([
                'message' => 'Category deleted'
            ]);
        }

        return response()->json([
            'message' => 'Category not found'
        ], 404);
    }
}
