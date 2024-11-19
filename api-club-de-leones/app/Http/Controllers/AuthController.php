<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public static function register(Request $request) {
        return response()->json([
            'message' => $request
        ]);
    }	
}
