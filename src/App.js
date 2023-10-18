import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainComponent from './component/Main.jsx';
import Register from './component/Register';
import Login from './component/login';
import Address from './component/Address';

import ProtectedRoute from './component/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainComponent />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Address' element={<ProtectedRoute><Address /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
