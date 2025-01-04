<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function users()
    {
        return response()->json([
            'users' => User::all()
        ]);
    }

    public function user($id)
    {
        return response()->json([
            'user' => User::find($id)
        ]);
    }

    public function assignType(Request $request, $id)
    {
        if ($id == $request->user()->id) {
            return response()->json([
                'message' => 'No puedes cambiar tu propio tipo de usuario'
            ], 403);
        }
        $user = User::find($id);
        $user->user_type = array_search($request->type, User::TYPE_MAP);
        $user->save();

        return response()->json([
            'message' => 'Tipo de usuario asignado correctamente'
        ]);
    }

    public function assignBranch(Request $request, $id)
    {
        $user = User::find($id);
        $user->branch_id = $request->branch_id;
        $user->save();

        return response()->json([
            'message' => 'Sede asignada correctamente'
        ]);
    }

}
