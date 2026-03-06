import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Configuración del Websocket
window.Pusher = Pusher;
const echo = new Echo({
    broadcaster: 'reverb',
    key: 'zq3tcu3p2rx5rwpfqzin', 
    wsHost: 'localhost',
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
});

const Chat = () => {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
   
    echo.channel('chat-vecinal')
      
      .listen('.nuevo-mensaje', (evento) => {
        console.log("¡Mensaje recibido!", evento);
        setMensajes((mensajesAnteriores) => [...mensajesAnteriores, evento.textoMensaje]);
      });
      
    return () => echo.leaveChannel('chat-vecinal');
  }, []);

  return (
    <div className="min-h-screen bg-green-700 p-4 font-sans flex flex-col items-center">
      <div className="w-full max-w-3xl bg-green-600 rounded-lg shadow-xl overflow-hidden flex flex-col h-[80vh]">
        
        {/* Encabezado del Chat */}
        <div className="bg-green-500 p-4 text-white text-center font-bold text-xl flex items-center shadow-md">
          <button className="mr-4 hover:bg-green-400 p-1 rounded">⬅</button>
          <span className="flex-1">Chat Vecinal</span>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 p-4 overflow-y-auto bg-green-600 flex flex-col gap-4">
          {mensajes.length === 0 ? (
            <p className="text-white/50 text-center mt-10">Esperando mensajes de la vecindad...</p>
          ) : (
            mensajes.map((msg, index) => (
              <div key={index} className="bg-white/20 text-white p-3 rounded-lg max-w-[80%] self-start shadow">
                <p>{msg}</p>
              </div>
            ))
          )}
        </div>

        { }
        <div className="p-4 bg-green-700 flex gap-2">
          <input 
            type="text" 
            placeholder="Escribe un mensaje..." 
            className="flex-1 p-2 bg-gray-500 text-white placeholder-gray-300 rounded outline-none"
          />
          <button className="bg-green-500 p-2 rounded text-white hover:bg-green-400">
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;