<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{

    public function index()
    {
        $events = Event::with('branch', 'type', 'managers:id,name,paternal_last_name,maternal_last_name,user_type,sex')->get();

        return response()->json([
            'events' => $events
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'sign_up_fee' => 'required|numeric',
            'sign_up_deadline' => 'required|date',
            'min_age' => 'required|integer',
            'max_age' => 'required|integer',
            'max_participants' => 'required|integer',
            'branch_id' => 'required|integer',
            'type_id' => 'required|integer',
            'managers' => 'required|array',
            'managers.*' => 'integer',
        ],);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $event = Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'sign_up_fee' => $request->sign_up_fee,
            'sign_up_deadline' => $request->sign_up_deadline,
            'min_age' => $request->min_age,
            'max_age' => $request->max_age,
            'max_participants' => $request->max_participants,
            'branch_id' => $request->branch_id,
            'type_id' => $request->type_id,
            'created_by' => $request->user()->id,
        ]);

        $event->touch();
        $event->managers()->attach($request->managers);

        return response()->json([
            'message' => 'Evento creado con éxito',
        ], 201);

    }

    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Evento no encontrado'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'sign_up_fee' => 'required|numeric',
            'sign_up_deadline' => 'required|date',
            'min_age' => 'required|integer',
            'max_age' => 'required|integer',
            'max_participants' => 'required|integer',
            'branch_id' => 'required|integer',
            'type_id' => 'required|integer',
            'managers' => 'required|array',
            'managers.*' => 'integer',
        ],);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $event->update([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'sign_up_fee' => $request->sign_up_fee,
            'sign_up_deadline' => $request->sign_up_deadline,
            'min_age' => $request->min_age,
            'max_age' => $request->max_age,
            'max_participants' => $request->max_participants,
            'branch_id' => $request->branch_id,
            'type_id' => $request->type_id,
        ]);

        //Guardar timestamps de ambos modelos
        $event->touch();
        $event->managers()->sync($request->managers);

        return response()->json([
            'message' => 'Evento actualizado con éxito',
        ]);
    }


    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Evento no encontrado'
            ], 404);
        }

        $event->delete();

        return response()->json([
            'message' => 'Evento eliminado con éxito',
        ]);
    }

    public function event($id)
    {
        $event = Event::with('branch', 'type')->find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Evento no encontrado'
            ], 404);
        }

        return response()->json([
            'event' => $event
        ]);
    }
}
