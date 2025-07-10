import { useEffect, useState } from 'react';
import { getSocket } from '../socket/socket';
import { api } from '../utils/api';
import RoomList from '../components/RoomList';
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { user } = useAuth();
  const socket = getSocket();
  const [rooms] = useState(['global', 'room1', 'room2']);
  const [currentRoom, setCurrentRoom] = useState('global');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  //Fetch initial data and wire up socket listeners
  useEffect(() => {
    if(!socket) return;
    console.log('chat effect triggered', {currentRoom})

    //Fetch users and messages
    api.get('/api/users').then(res =>{ 
      console.log('Users:', res.data);
      setUsers(res.data)});
    api.get(`/api/messages/${currentRoom}`).then(res => setMessages(res.data));

    //Join the room
    socket.emit('join_room', { room: currentRoom });

    //Listeners
    socket.on('user_list', setUsers);
    socket.on('receive_message', msg => setMessages(prev => [...prev, msg]));
    socket.on('message_reacted', ({ messageId, reactions }) =>{
      setMessages(prev =>
        prev.map(m=>
          m._id === messageId
          ?{ ...m, reactions: Object.fromEntries(reactions)}
          : m
        )
      );
    })

    socket.on('joined_private', ({ room })=>{
      //When a private.room join fires, reload its history
      api.get(`/api/messages/${room}`).then(res => setMessages(res.data));
        setCurrentRoom(room);
    })

    //Cleanup
    return () => {
      socket.off('user_list');
      socket.off('receive_message');
      socket.off('message_reacted');
      socket.off('joined_private')
    }
  }, [socket, currentRoom]);

  const handleRoomChange = room => setCurrentRoom(room);

  return (
    <div className="flex h-screen">
      <aside className="w-1/8 bg-white p-4">
        <RoomList rooms={rooms} current={currentRoom} onSelect={handleRoomChange} />
        <UserList users={users} me={user} onRoomChange={handleRoomChange}/>
      </aside>
      <main className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        <MessageInput room={currentRoom} />
      </main>
    </div>
  );
}