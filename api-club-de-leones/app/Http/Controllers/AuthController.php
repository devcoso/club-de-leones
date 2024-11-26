<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public static function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'paternal_last_name' => 'required|string|min:3|max:255',
            'maternal_last_name' => 'required|string|min:3|max:255',
            'phone_number' => 'required|string|min:10|max:10',
            'sex' => 'required|int',
            'birthdate' => 'required|date',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
        ], [
            'email.unique' => 'El correo electrónico ya está registrado.',
            'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $validated = $validator->validated();

        $user = User::create($validated);

        return response()->json([
            $user,
        ], 201);
    }	
}
