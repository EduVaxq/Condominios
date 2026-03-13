<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Mensaje implements ShouldBroadcastNow 
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // Estas dos variables se convertirán mágicamente en nuestro JSON en el Frontend
    public $tipo;
    public $mensaje;

    public function __construct($tipo, $mensaje)
    {
        $this->tipo = $tipo;
        $this->mensaje = $mensaje;
    }

    public function broadcastOn(): array
    {
        // Cambiamos el canal para que sea exclusivo de notificaciones
        return [
            new Channel('notificaciones-vecinales'),
        ];
    }

    public function broadcastAs(): string
    {
        // Este es el nombre del evento que React está escuchando
        return 'nueva-notificacion';
    }
}