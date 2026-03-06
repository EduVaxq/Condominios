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


    public $textoMensaje;

    public function __construct($textoMensaje)
    {
        $this->textoMensaje = $textoMensaje;
    }
    public function broadcastOn(): array
    {
        return [
            new Channel('chat-vecinal'),
        ];
    }


    public function broadcastAs(): string
    {
        return 'nuevo-mensaje';
    }
}