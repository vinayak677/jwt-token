import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Auth from './pages/Auth.js';
import AuthContext from './contextApi/AuthContext.js';
import Admin from './pages/Admin.js';

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
