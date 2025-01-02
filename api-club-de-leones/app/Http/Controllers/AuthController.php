<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

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

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['errors' => 'Credenciales incorrectas'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    public function forgotPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json([
                'errors' => ['El correo electrónico no está registrado']
            ], 406);
        }
        $status = Password::sendResetLink($request->only('email'));
        return $status === Password::RESET_LINK_SENT
        ? response()->json(['messages' => "Se ha enviado un correo para reestablecer tu contraseña"], 200)
        : response()->json(['errors' => "Hubo un problema, intenta más tarde"], 400);
        // ? response()->json(['messages' => __($status)], 200)
        // : response()->json(['errors' => __($status)], 400);
    }

    public function resetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string',
        ]);
        
        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->getMessages()
            ], 406);
        }

        $user = User::where('email', $request->email)->first();
        
        $status = Password::reset($request->only('email', 'password', 'token'), function($user, $password){
            $user->password = $password;
            $user->save();
        });

        return $status === Password::PASSWORD_RESET
        ? response()->json(['messages' => "Contraseña reestablecida correctamente"], 200)
        : response()->json(['errors' => "Token no válido o expirado"], 400);
        //? response()->json(['messages' => __($status)], 200)
        //: response()->json(['errors' => __($status)], 400);
    }

    public function me(Request $request)
    {
        return $request->user();
    }   

}
