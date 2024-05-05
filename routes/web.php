<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DishesController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function() {
    $connection = DB::connection('mongodb');
    $msg = 'access';
    try {
        $connection->command(['ping' => 1]);
    } catch(\Exception $e) {
        $msg = 'failed';
    }
    return ['msg'=>$msg];
});

Route::post('/save_order', [OrderController::class, 'save']);
Route::get('/choose_meal', [DishesController::class, 'chooseMeal']);
