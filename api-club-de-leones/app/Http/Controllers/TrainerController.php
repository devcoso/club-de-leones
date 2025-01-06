<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use App\Models\User;
use App\Models\UserTrainer;
use Illuminate\Support\Facades\Validator;

class TrainerController extends Controller
{
    public function members()
    {
        $trainers_by_branch = Branch::with(['users' => function($query) {
            $query->where('user_type', 1);
        }])->get();

        return response()->json([
            'users' => $trainers_by_branch
        ]);
    }
    
    public function addStudent(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $trainer = $request->user();
        $user = User::find($id);

        if ($user->user_type != 1) {
            return response()->json([
                'message' => 'El usuario no es un alumno'
            ], 400);
        }

        $user_trainer = new UserTrainer();
        $user_trainer->title = $request->title;
        $user_trainer->trainer_id = $trainer->id;
        $user_trainer->user_id = $user->id;
        $user_trainer->save();

        $user_trainer->load('user');

        return response()->json([
            'message' => 'Alumno asignado correctamente',
            'member' => $user_trainer
        ]);
    }

    public function editTitle(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $trainer = $request->user();
        $user = User::find($id);

        if ($user->user_type != 1) {
            return response()->json([
                'message' => 'El usuario no es un alumno'
            ], 400);
        }

        $user_trainer = UserTrainer::where('trainer_id', $trainer->id)
            ->where('user_id', $user->id)
            ->first();

        if (!$user_trainer) {
            return response()->json([
                'message' => 'El alumno no está asignado a este entrenador'
            ], 400);
        }

        $user_trainer->title = $request->title;
        $user_trainer->save();

        return response()->json([
            'message' => 'Título actualizado correctamente'
        ]);
    }

    public function removeStudent(Request $request, $id)
    {
        $trainer = $request->user();
        $user = User::find($id);

        if ($user->user_type != 1) {
            return response()->json([
                'message' => 'El usuario no es un alumno'
            ], 400);
        }

        // Obtener todos los registros de la tabla user_trainers
        $user_trainer = UserTrainer::where('trainer_id', $trainer->id)
            ->where('user_id', $user->id)
            ->get();

        if (!$user_trainer) {  
            return response()->json([
                'message' => 'El alumno no está asignado a este entrenador'
            ], 400);
        }

        //Borrar todos los registros de la tabla user_trainers
        foreach ($user_trainer as $ut) {
            $ut->delete();
        }

        return response()->json([
            'message' => 'Alumno eliminado correctamente'
        ]);
    }

    public function myStudents(Request $request)
    {
        $trainer = $request->user();
        $students = UserTrainer::where('trainer_id', $trainer->id)
            ->with('student')
            ->get();

        return response()->json([
            'students' => $students
        ]);
    }
}
