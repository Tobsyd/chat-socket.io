import { useState } from 'react';
import { getSocket } from '../socket/socket';
import {api} from '../utils/api';
export default function MessageInput({ room }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const socket = getSocket();
  const send = async () => {
    let fileUrl =null;
    if(file){
      const form = new FormData(); 
      form.append('file', file);
      const { data }= await api.post('/api/upload', form);
      fileUrl= data.url;
    }

    // if (!text.trim()) return;
    socket.emit('send_message', { room, message: text, file: fileUrl});
    setText('');
    setFile(null);

   
  };
  return (
    <div className="p-4 bg-white flex space-x-2">
      <input
        value={text}
        type={text}
        onChange={e => {setText(e.target.value);
          socket.emit('typing', {room, isTyping: !! e.target.value});
        }}
        onKeyDown={e => e.key==='Enter' && send()}
        className="flex-1 border rounded p-2"
        placeholder="Type a message..."
      />

      {/* Hidden file input */}

      <input id="fileInput" type="file" className="hidden" onChange={e=> setFile(e.target.files[0])} />
      <label
        htmlFor="fileInput"
        className="cursor-pointer px-2 py-1 bg-gray-200 rounded"
      >
        🔗
      </label>
      <button onClick={send} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}