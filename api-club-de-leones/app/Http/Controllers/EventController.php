<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{

    public function index()
    {
        $events = Event::all();

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

        return response()->json([
            'message' => 'Evento creado con éxito',
        ]);

    }

    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }

    public function event($id)
    {
        //
    }
}
