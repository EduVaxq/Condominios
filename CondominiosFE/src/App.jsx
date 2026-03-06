import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './vistas/Login';
import Hub from './vistas/Hub';
import Chat from './Vistas/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;