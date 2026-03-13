<?php

use Illuminate\Support\Facades\Route;
use App\Events\Mensaje;

Route::get('/', function () {
    return view('welcome');
});

// Ahora la ruta recibe el {tipo} directamente en la URL
Route::get('/prueba-notificacion/{tipo}', function ($tipo) {
    
    // Validamos que sea uno de los 4 tipos permitidos en tu tarea
    $tiposValidos = ['mensaje', 'multas', 'asambleas', 'pagos atrasados'];
    
    if (!in_array($tipo, $tiposValidos)) {
        return "Error: Tipo no válido. Usa: mensaje, multas, asambleas o pagos atrasados";
    }

    // Generamos un texto dependiendo del tipo para que se vea realista
    $textos = [
        'mensaje' => 'El vecino del 4B dejó la puerta abierta.',
        'multas' => 'Tienes una multa por dejar la basura en el pasillo.',
        'asambleas' => 'Junta vecinal urgente este viernes a las 8 PM.',
        'pagos atrasados' => '¡Don Ramón, pague los 14 meses de renta!'
    ];

    $textoMensaje = $textos[$tipo];

    // Disparamos el evento con los dos parámetros
    Mensaje::dispatch($tipo, $textoMensaje);

    return "Notificación de tipo '{$tipo}' disparada con éxito al websocket.";
});