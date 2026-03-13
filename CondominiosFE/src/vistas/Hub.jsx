import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Configuración global del Websocket (Idealmente, en un futuro muévela a un archivo separado para no repetirla)
window.Pusher = Pusher;
const echoConfig = new Echo({
    broadcaster: 'reverb',
    key: 'zq3tcu3p2rx5rwpfqzin', 
    wsHost: 'localhost',
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
});

const Hub = () => {
  const navigate = useNavigate();
  
  // Estados para las notificaciones
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [hayNuevas, setHayNuevas] = useState(false); // Para cambiar el estado visual del botón

  useEffect(() => {
    // Escuchamos un canal global para las notificaciones del usuario/condominio
    // (Asegúrate de que el nombre del canal y el evento coincidan con tu backend en Laravel)
    echoConfig.channel('notificaciones-vecinales')
      .listen('.nueva-notificacion', (evento) => {
        console.log("¡Notificación recibida!", evento);
        
        // Agregamos la nueva notificación al inicio de la lista
        setNotificaciones((prev) => [evento, ...prev]);
        setHayNuevas(true); // Activamos el indicador visual
      });
      
    return () => echoConfig.leaveChannel('notificaciones-vecinales');
  }, []);

  // Función para redirigir según el tipo de notificación
  const manejarClicNotificacion = (notificacion) => {
    // Redirigimos según lo que pide la tarea
    switch (notificacion.tipo) {
      case 'mensaje':
        navigate('/chat');
        break;
      case 'multas':
        navigate('/multas'); // Asume que crearás esta ruta
        break;
      case 'asambleas':
        navigate('/asambleas'); // Asume que crearás esta ruta
        break;
      case 'pagos atrasados':
        navigate('/pagos'); // Ya tienes un botón de pagos
        break;
      default:
        console.warn("Tipo de notificación desconocido:", notificacion.tipo);
    }
    
    // Opcional: cerramos el menú después de hacer clic
    setMostrarMenu(false);
  };

  const toggleNotificaciones = () => {
    setMostrarMenu(!mostrarMenu);
    if (hayNuevas) setHayNuevas(false); // Quitamos la alerta visual al abrir el menú
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col md:flex-row font-sans text-white">
      <aside className="w-full md:w-64 bg-green-700 flex flex-col justify-between p-4 shadow-lg z-10 relative">
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-green-500 pb-4">
            <span className="text-2xl cursor-pointer">≡</span>
            <h2 className="text-xl font-bold">Menú Principal</h2>
          </div>
          <nav className="flex flex-col gap-3">
            <button className="bg-green-500 hover:bg-green-400 p-2 rounded text-left px-4 transition-colors shadow">Residentes</button>
            <button 
              onClick={() => navigate('/chat')} 
              className="bg-green-500 hover:bg-green-400 p-2 rounded text-left px-4 transition-colors shadow"
            >
              Chat
            </button>
            <button className="bg-green-500 hover:bg-green-400 p-2 rounded text-left px-4 transition-colors shadow">Pagos</button>
          </nav>
        </div>
        
        {/* Sección de Alertas / Notificaciones */}
        <div className="mt-8 relative">
          
          {/* Menú Desplegable de Notificaciones */}
          {mostrarMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-green-800 rounded shadow-2xl border border-green-500 overflow-hidden max-h-64 overflow-y-auto">
              <div className="p-2 border-b border-green-600 font-bold bg-green-900 text-center text-sm">
                Notificaciones
              </div>
              {notificaciones.length === 0 ? (
                <div className="p-4 text-center text-sm text-white/50">
                  No hay notificaciones nuevas
                </div>
              ) : (
                <ul className="flex flex-col">
                  {notificaciones.map((notif, index) => (
                    <li 
                      key={index} 
                      onClick={() => manejarClicNotificacion(notif)}
                      className="p-3 border-b border-green-700 hover:bg-green-500 cursor-pointer transition-colors text-sm"
                    >
                      <strong className="block capitalize text-green-200">{notif.tipo}</strong>
                      <span className="text-white/90">{notif.mensaje}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Botón de Alertas */}
          <button 
            onClick={toggleNotificaciones}
            className={`flex items-center gap-2 transition-colors w-full p-2 rounded ${hayNuevas ? 'bg-red-900/40 text-white' : 'text-red-200 hover:text-white hover:bg-green-600'}`}
          >
            Alertas 
            <span className={`${hayNuevas ? 'bg-red-500 animate-pulse' : 'bg-red-600/50'} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-all`}>
              {notificaciones.length}
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 flex items-center justify-center relative">
        <div className="border-4 border-grey-500 p-1 bg-black/20 shadow-2xl w-full max-w-3xl flex items-center justify-center h-64 md:h-96">
            <img 
              src="/IMG/cdmx-ciudad-mexico-casas-vecindario-parroquia-santa-veracruz.jpg" 
              alt="La Vecindad" 
              className="w-full h-full object-cover"
            />
        </div>
      </main>
    </div>
  );
};

export default Hub;