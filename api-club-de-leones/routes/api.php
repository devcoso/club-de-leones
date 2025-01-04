<?php

use Illuminate\Support\Facades\Route;
// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventTypeController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\UserController;

// Auth routes
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

// Admin routes
Route::group([
    'prefix' => 'admin',
    'middleware' => ['auth:sanctum', 'IsAdmin']
], function () {
    // Event Types
    Route::post('/event-type', [EventTypeController::class, 'store']);
    Route::put('/event-type/{id}', [EventTypeController::class, 'update']);
    Route::delete('/event-type/{id}', [EventTypeController::class, 'destroy']);

    // Branches
    Route::post('/branch', [BranchController::class, 'store']);
    Route::put('/branch/{id}', [BranchController::class, 'update']);
    Route::delete('/branch/{id}', [BranchController::class, 'destroy']);

    // Users
    Route::get('/users', [UserController::class, 'users']);
    Route::get('/users/{id}', [UserController::class, 'user']);
    Route::post('/users/{id}/assign-type', [UserController::class, 'assignType']);
    Route::post('/users/{id}/assign-branch', [UserController::class, 'assignBranch']);
});

// Public routes
Route::get('/event-type', [EventTypeController::class, 'index']);
Route::get('/branch', [BranchController::class, 'index']);
Route::get('/branch/{id}', [BranchController::class, 'show']);

