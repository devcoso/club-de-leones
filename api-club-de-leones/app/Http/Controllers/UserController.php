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

    public function assignRole(Request $request, $id)
    {
        $user = User::find($id);
        $user->user_type = $request->user_type;
        $user->save();

        return response()->json([
            'message' => 'Role assigned successfully'
        ]);
    }

    public function assignBranch(Request $request, $id)
    {
        $user = User::find($id);
        $user->branch_id = $request->branch_id;
        $user->save();

        return response()->json([
            'message' => 'Branch assigned successfully'
        ]);
    }

}
