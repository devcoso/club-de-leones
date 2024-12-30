<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventType;
use Illuminate\Support\Facades\Validator;

class EventTypeController extends Controller
{
    function index() {
        $categories = EventType::all();

        return response()->json([
            'categories' => $categories
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string'
        ],);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $validated = $validator->validated();

        $category = EventType::create($validated);

        return response()->json([
            'message' => 'Tipo de evento ' . $category->name . ' creado',
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
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'description' => 'required|string'
            ],);
    
            if($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()->getMessages()
                ], 406);
            }
    
            $validated = $validator->validated();
            
            $category->update($validated);

            return response()->json([
                'message' => 'Tipo de evento ' . $category->name . ' actualizado',
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
