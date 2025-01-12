<?php

use Illuminate\Support\Facades\Route;
// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventTypeController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventSessionController;
use App\Http\Controllers\TrainerController;

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
    Route::get('/users/trainers', [UserController::class, 'trainers']);
    Route::get('/users/{id}', [UserController::class, 'user']);
    Route::post('/users/{id}/assign-type', [UserController::class, 'assignType']);
    Route::post('/users/{id}/assign-branch', [UserController::class, 'assignBranch']);
    
    // Events
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);
});

// Trainer routes
Route::group([
    'prefix' => 'trainer',
    'middleware' => ['auth:sanctum', 'IsTrainer']
], function () {
    // Events
    Route::get('/users/members', [TrainerController::class, 'members']);
    Route::post('/add-student/{id}', [TrainerController::class, 'addStudent']);
    Route::put('/edit-title/{id}', [TrainerController::class, 'editTitle']);
    Route::delete('/remove-student/{id}', [TrainerController::class, 'removeStudent']);
});


// User routes
Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    // Route::get('/events', [UserController::class, 'events']);
    // Route::post('/events/{id}/sign-up', [UserController::class, 'signUp']);
    // Route::post('/events/{id}/cancel-sign-up', [UserController::class, 'cancelSignUp']);
    Route::get('/users/my-members', [UserController::class, 'myMembers']);
    Route::get('/events/{id}', [EventController::class, 'event']);
    Route::post('/events/{id}/sign-up', [EventSessionController::class, 'store']);
    Route::post('/events/{id}/sign-off', [EventSessionController::class, 'destroy']);
    Route::get('/events/{id}/sessions', [EventSessionController::class, 'indexByEvent']);
    Route::put('/events/sessions/{session_id}', [EventSessionController::class, 'update']);
});

// Public routes
Route::get('/event-type', [EventTypeController::class, 'index']);
Route::get('/branch', [BranchController::class, 'index']);
Route::get('/branch/{id}', [BranchController::class, 'show']);
Route::get('/events', [EventController::class, 'index']);
