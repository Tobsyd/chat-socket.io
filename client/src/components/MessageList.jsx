import dayjs from 'dayjs';
import {getSocket } from '../socket/socket';


export default function MessageList({ messages, me }) {
  // return (
  //   <div className="flex-1 overflow-auto p-4 bg-gray-50 space-y-4">
  //     {messages.map(m => (
  //       <div key={m._id}>
  //         <div className="text-xs text-gray-500">
  //           <span className="font-bold">{m.senderName}</span> {' '}
  //           {dayjs(m.timestamp).format('HH:mm')}
  //         </div>
  //         <div className="mt-1">{m.text}</div>
  //       </div>
  //     ))}
  //   </div>
  // );

  const socket = getSocket();
  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-50 space-y-4">
      {messages.map(m => (
        <div key={m._id}>
          <div className="text-xs text-gray-500">
            <span className="font-bold">{m.senderName}</span> {' '}
            {dayjs(m.timestamp).format('HH:mm')}
          </div>
          <div className="mt-1">{m.text}</div>
        </div>
      ))}
    </div>


    // <div className="flex-1 overflow-auto p-4 bg-gray-50 space-y-4">
    //   {messages.map(m => (
    //     <div key={m._id} className={`p-2 rounded ${
    //       m.senderId === me.id ? 'bg-blue-100 self-end': 'bg-yellow-200'
    //     }`}>
    //         <div className="text-xs text-gray-500 flex justify-between">
    //           <span className="font-bold">{m.senderName}</span> {' '}
    //          <span> {dayjs(m.timestamp).format('HH:mm')} </span> 
    //         </div>
    //         {/* <div className="mt-1">{m.text}</div> */}
    //         {/* Text or File/Image */}
    //         {/* {m.text && <div className="mt-1">{m.text}</div>}
    //         {m.fileUrl && (
    //           <div className="mt-1">
    //             {m.fileUrl.match(/\.(jpeg|jpg|gif|png)$/)?(
    //               <img src={m.fileUrl} alt="uploaded" className="max-w-xs rounded"/>
    //             ):(
    //               <a
    //                 href={m.fileUrl}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-blue-600 underline"
    //                 >
    //                   Download File
    //                 </a>
    //             )}
    //             </div>
    //         )} */}

    //       {/*Reactions*/}
    //       <div className="mt-2 flex space-x-2 text-sm">
    //         {m.reactions && Object.entries(m.reactions).map(([emoji, users]) => (
    //           <button key={emoji} onClick={() => socket.emit('react_message',
    //             { room: m.room, messageId: m._id, reaction: emoji })}>
    //             {emoji}{users.length}
    //           </button>
    //         ))}
    //         <button className="px-1 hover:bg-gray-200" onClick={() => socket.emit('react_message',
    //           {
    //             room: m.room, messageId: m._id,
    //             reaction: '👍'
    //           })}>👍</button>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}