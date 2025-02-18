<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Branch;
use App\Models\UserTrainer;
use App\Models\Event;
use App\Models\EventType;
use App\Models\EventSession;

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

    public function adminHome()
    {
        $total_members = User::where('user_type', 1)->count();
        $total_trainers = User::where('user_type', 3)->count();
        $total_admins = User::where('user_type', 2)->count();
        $total_branches = Branch::count();
        $total_event_types = EventType::count();
        $total_events = Event::count();
        $total_sessions = EventSession::count();

        return response()->json([
            'total_members' => $total_members,
            'total_trainers' => $total_trainers,
            'total_admins' => $total_admins,
            'total_branches' => $total_branches,
            'total_event_types' => $total_event_types,
            'total_events' => $total_events,
            'total_sessions' => $total_sessions
        ]);
    }

    public function main(Request $request)
    {
        $user = $request->user();
        $branch = $user->branch;
        $events = Event::where('branch_id', $branch->id)->orderBy('id', 'desc')->limit(6)
        ->with('type')
        ->with('branch')
        ->get();
        $my_events = EventSession::where('user_id', $user->id)->with('event')
        ->with('event.type')
        ->with('event.branch')
        ->orderBy('id', 'desc')->limit(6)->get();

        return response()->json([
            'branch_events' => $events,
            'my_events' => $my_events,
            'branch' => $branch
        ]);
    }   
}
