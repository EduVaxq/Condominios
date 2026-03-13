<?php

use Illuminate\Support\Facades\Route;
use App\Events\Mensaje;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/prueba-notificacion/{tipo}', function ($tipo) {
    

    $tiposValidos = ['mensaje', 'multas', 'asambleas', 'pagos atrasados'];
    
    if (!in_array($tipo, $tiposValidos)) {
        return "Error: Tipo no válido. Usa: mensaje, multas, asambleas o pagos atrasados";
    }


    $textos = [
        'mensaje' => 'El vecino del 4B dejó la puerta abierta.',
        'multas' => 'Tienes una multa por dejar la basura en el pasillo.',
        'asambleas' => 'Junta vecinal urgente este viernes a las 8 PM.',
        'pagos atrasados' => '¡Don Ramón, pague los 14 meses de renta!'
    ];

    $textoMensaje = $textos[$tipo];

    Mensaje::dispatch($tipo, $textoMensaje);

    return "Notificación de tipo '{$tipo}' disparada con éxito al websocket.";
});