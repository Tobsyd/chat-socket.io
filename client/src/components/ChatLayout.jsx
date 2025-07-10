import { useEffect, useState } from 'react';
import { getUsers, getMessages } from '../utils/api';
import { getSocket } from '../socket/socket';

export default function ChatLayout({ user }) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const room = 'global';
  const socket = getSocket();

  useEffect(() => {
    const init = async () => {
      setUsers(await getUsers());
      setMessages(await getMessages(room));
    };
    init();

    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit('send_message', { room, message: input });
    setInput('');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/6 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Users</h2>
        {users.map(u => (
          <div key={u._id} className="text-sm">{u.username}</div>
        ))}
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-2 bg-white">
          {messages.map(m => (
            <div key={m._id}>
              <span className="font-semibold">{m.senderName}:</span> {m.text}
            </div>
          ))}
        </div>
        <div className="p-2 bg-gray-50 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded p-2"
            placeholder="Type a message..."
          />
          <button className="ml-2 bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}