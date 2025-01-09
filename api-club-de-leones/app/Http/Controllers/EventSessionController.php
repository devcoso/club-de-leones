<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventSession;
use Illuminate\Support\Facades\Validator;
use App\Models\Event;

class EventSessionController extends Controller
{
    public function store(Request $request, $id)
    {

        $event = Event::find($id);
        $user = $request->user();
        if($event->sign_up_deadline < now()) {
            return response()->json([
                'message' => 'Ya no puedes registrarte a este evento'
            ], 400);
        }

        $birthDate = explode("-", $user->birthdate);
        $age = (date("md", date("U", mktime(0, 0, 0, $birthDate[1], $birthDate[2], $birthDate[0]))) > date("md")
            ? ((date("Y") - $birthDate[0]) - 1)
            : (date("Y") - $birthDate[0]));
        if($event->min_age > $age || $event->max_age < $age) {
            return response()->json([
                'message' => 'No cumples con la edad requerida para este evento'
            ], 400);
        }

        $all_participants = $event->participants->count();
        if($event->max_participants <= $all_participants) {
            return response()->json([
                'message' => 'El evento está lleno'
            ], 400);
        }

        $eventSession = EventSession::where('event_id', $id)
            ->where('user_id', $request->user()->id)
            ->first();
        
        if($eventSession) {
            return response()->json([
                'message' => 'Ya estás registrado a este evento'
            ], 400);
        }

        $eventSession = EventSession::create([
            'event_id' => $id,
            'user_id' => $request->user()->id,
        ]);

        if(!$eventSession) {
            return response()->json([
                'message' => 'No se pudo registrar al evento'
            ], 400);
        }

        $eventSession = EventSession::where('event_id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        return response()->json([
            'message' => 'Registro exitoso',
            'event_session' => $eventSession
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $eventSession = EventSession::where('event_id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if(!$eventSession) {
            return response()->json([
                'message' => 'Evento no encontrado'
            ], 404);
        }

        $event = $eventSession->event;
        if($event->sign_up_deadline < now()) {
            return response()->json([
                'message' => 'Ya no puedes cancelar tu registro a este evento'
            ], 400);
        }

        $eventSession->delete();

        return response()->json([
            'message' => 'Registro cancelado con éxito'
        ]);
    }   

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'paticipated_at' => 'required|date',
            'duration' => 'required|numeric',
        ]);

        if($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $eventSession = EventSession::find($id);

        if(!$eventSession) {
            return response()->json([
                'message' => 'Event session not found'
            ], 404);
        }

        $eventSession->update([
            'paticipated_at' => $request->paticipated_at,
            'duration' => $request->duration,
        ]);

        return response()->json([
            'event_session' => $eventSession
        ]);
    }

    public function indexByEvent($id)
    {
       // 
    }    
}
