<?php

use Illuminate\Support\Facades\Route;
use App\Events\Mensaje;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/prueba-chat', function () {
    Mensaje::dispatch('¡Don Ramón, pague la renta!');
    return "Mensaje disparado por el websocket con éxito.";
});