import { useEffect } from 'react';
import { socket } from '../socket/socket';
export default function useNotification() {
  useEffect(() => {
    Notification.requestPermission();
    socket.on('notification', ({ type, user }) => {
      if (Notification.permission === 'granted') {
        new Notification(`${user.username} ${type}ed`);
      }
    });
  }, []);
}