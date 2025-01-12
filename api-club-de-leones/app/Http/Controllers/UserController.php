<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Branch;
use App\Models\UserTrainer;

class UserController extends Controller
{
    public function users()
    {
        return response()->json([
            'users' => User::all()
        ]);
    }

    public function trainers()
    {
        $trainers_by_branch = Branch::with(['users' => function($query) {
            $query->where('user_type', 3);
        }])->get();
        

        return response()->json([
            'trainers' => $trainers_by_branch
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

    public function myMembers(Request $request)
    {
        $user = $request->user();
        if($request->user()->user_type == 3) {
            $members = UserTrainer::where('trainer_id', $user->id)->with('user')->get();
        } else if($request->user()->user_type == 2) {
            $branch = $request->user()->branch;
            $members = User::where('branch_id', $user->id)->get();
        } else {
            $members = UserTrainer::where('user_id', $user->id)->with('trainer')->get();
        }

        return response()->json([
            'members' => $members
        ]);
    }

    public function setTshirtSize(Request $request)
    {
        $user = User::find($request->user()->id);

        $user->tshirt_size = $request->tshirt_size;
        $user->save();

        return response()->json([
            'message' => 'Talla de camiseta asignada correctamente'
        ]);
    }

}
