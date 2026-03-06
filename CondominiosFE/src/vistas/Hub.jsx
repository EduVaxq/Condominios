import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hub = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-green-600 flex flex-col md:flex-row font-sans text-white">
      <aside className="w-full md:w-64 bg-green-700 flex flex-col justify-between p-4 shadow-lg z-10">
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
        <div className="mt-8">
          <button className="flex items-center gap-2 text-red-200 hover:text-white transition-colors">
            Alertas 
            <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
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