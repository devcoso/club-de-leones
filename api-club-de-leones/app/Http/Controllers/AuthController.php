<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public static function register(Request $request) {
        //Obtenemos los datos del usuario
        $data = $request->all();
        return response()->json([
            'message' => $data
        ]);
    }	
}
