import React, { useState, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


const Login = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  
  const nodeRef = useRef(null); 

  const manejarLogin = (e) => {
    e.preventDefault(); 
    setCargando(true);
    setMostrarAlerta(false);

    const peticionHttp = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("¡Bienvenido vecino! Credenciales correctas.");
      }, 2000);
    });

    peticionHttp.then((respuesta) => {
      setCargando(false);
      setMensaje(respuesta);
      setMostrarAlerta(true); 

      setTimeout(() => {
        navigate('/hub');
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-white text-center mb-8">
        <h1 className="text-xl font-bold">Asociación Vecinal</h1>
        <h2 className="text-sm">Fraccionamiento los altos robles del valle de los cielos del Encino</h2>
      </div>

      <div className="bg-white/20 p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col sm:flex-row gap-6 relative">
        <div className="w-full sm:w-1/2 bg-gray-300 rounded flex items-center justify-center min-h-[150px] overflow-hidden">
           <img src="IMG/JAM_4852.jpg" alt="Vecindad" className="w-full h-full object-cover" />
        </div>

        <div className="w-full sm:w-1/2 flex flex-col gap-4 relative">
          <input type="text" placeholder="N° de Apartamento" className="w-full p-2 bg-green-500 text-white placeholder-white/70 rounded border-none focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="text" placeholder="Usuario" className="w-full p-2 bg-green-500 text-white placeholder-white/70 rounded border-none focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="password" placeholder="Contraseña" className="w-full p-2 bg-green-500 text-white placeholder-white/70 rounded border-none focus:ring-2 focus:ring-green-300 outline-none" />
          
          <button 
            onClick={manejarLogin} 
            disabled={cargando}
            className={`mt-4 w-full text-white font-bold py-2 px-4 rounded transition-all flex justify-center items-center h-10 ${
              cargando ? 'bg-green-800 cursor-wait' : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {cargando ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Ingresar'
            )}
          </button>
        </div>
      </div>

      <div className="h-16 mt-4 flex items-center justify-center w-full max-w-md">
        <CSSTransition
          in={mostrarAlerta}
          timeout={300}
          classNames="alerta"
          unmountOnExit
          nodeRef={nodeRef} 
        >
          { }
          <div ref={nodeRef} className="bg-green-800 text-white border border-green-400 p-3 rounded shadow-lg text-center w-full font-bold">
            {mensaje}
          </div>
        </CSSTransition>
      </div>

    </div>
  );
};

export default Login;