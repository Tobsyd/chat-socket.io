import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { initSocket } from '../socket/socket';

export default function LoginPage() {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = async (e)=> {
    e.preventDefault();
    const { data } = await api.post('/api/login', { username: name });
    login(data);
    initSocket(data.token);
    nav('/chat');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handle} className="bg-white p-8 rounded shadow" >
        <h1 className="text-2xl mb-4">Join Chat</h1>
        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Username"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Enter
        </button>
      </form>
    </div>
  );
}