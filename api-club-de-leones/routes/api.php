<?php

use Illuminate\Support\Facades\Route;
// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventTypeController;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::group([
    'prefix' => 'admin',
    'middleware' => ['auth:sanctum', 'IsAdmin']
], function () {
    Route::post('/event-type', [EventTypeController::class, 'store']);
    Route::put('/event-type/{id}', [EventTypeController::class, 'update']);
    Route::delete('/event-type/{id}', [EventTypeController::class, 'destroy']);
});

Route::get('/event-type', [EventTypeController::class, 'index']);