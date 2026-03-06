import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-white text-center mb-8">
        <h1 className="text-xl font-bold">Asociación Vecinal</h1>
        <h2 className="text-sm">Fraccionamiento los altos robles del valle de los cielos del Encino</h2>
      </div>

      <div className="bg-white/20 p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2 bg-gray-300 rounded flex items-center justify-center min-h-[150px]">
           <img src="IMG/JAM_4852.jpg" alt="Vecindad" />
        </div>

        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          <input type="text" placeholder="N° de Apartamento" className="w-full p-2 bg-green-500 text-white placeholder-white/70 rounded border-none focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="text" placeholder="Usuario" className="w-full p-2 bg-green-500 text-white placeholder-white/70 rounded border-none focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="password" placeholder="Contraseña" className="w-full p-2 bg-green-500 text-white placeholder-white/70 rounded border-none focus:ring-2 focus:ring-green-300 outline-none" />
          
          <button onClick={() => navigate('/hub')} className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-colors">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;