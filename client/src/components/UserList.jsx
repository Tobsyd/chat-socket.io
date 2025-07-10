export default function UserList({ users, me, onRoomChange }) {
  // const room = user._id>me._id ? `${user._id}`: `${user._id}_${me._id}`;
  // <span className={u.online? "h-2 w-2 bg-green-500 rounded-full" }/>
  return (
    <ul className="mt-8 space-y-2">
      {users.map(u => (
        <li key={u._id} onClick={()=>{
           const room = me.id>u._id ? `${me._id}`: `${u._id}_${me._id}`;
           socket.emit('select_user', { targetUserId: u._id});
           onRoomChange(room);
        }} 
        className="flex items-center space-x-2">
          <span className={u.online? 'text-green-500': 'text-gray-400'}/>
          <span>{u.username}</span>
        </li>
      ))}
    </ul>
  );
}