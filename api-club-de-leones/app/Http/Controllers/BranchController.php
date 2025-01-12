<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use Illuminate\Support\Facades\Validator;

class BranchController extends Controller
{
    public function index() {
        $branches = Branch::all();

        return response()->json([
            'branches' => $branches
        ]);
    }


    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'location' => 'required|string',
            'phone_number' => 'required|string'
        ],);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $validated = $validator->validated();

        $branch = Branch::create($validated);

        return response()->json([
            'message' => 'Sucursal ' . $branch->name . ' creada',
            'branch' => $branch
        ], 201);
    }

    public function update(Request $request, $id) {
        $branch = Branch::find($id);

        if ($branch) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'location' => 'required|string',
                'phone_number' => 'required|string'
            ],);

            if($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()->getMessages()
                ], 406);
            }

            $validated = $validator->validated();
            
            $branch->update($validated);

            return response()->json([
                'message' => 'Sucursal ' . $branch->name . ' actualizada',
                'branch' => $branch
            ]);
        }

        return response()->json([
            'message' => 'Sucursal no encontrada'
        ], 404);
    }

    public function destroy($id) {
        $branch = Branch::find($id);

        if ($branch) {
            $branch->delete();

            return response()->json([
                'message' => 'Sucursal ' . $branch->name . ' eliminada'
            ]);
        }

        return response()->json([
            'message' => 'Sucursal no encontrada'
        ], 404);
    }
}
