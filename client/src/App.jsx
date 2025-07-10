import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={token ? <ChatPage /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={token ? '/chat' : '/login'} />} />
    </Routes>
    </BrowserRouter>
  );
}