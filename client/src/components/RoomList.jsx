export default function RoomList({ rooms, current, onSelect }) {
  return (
    <ul className="space-y-2">
      {rooms.map(r => (
        <li
          key={r}
          onClick={() => onSelect(r)}
          className={`p-2 rounded cursor-pointer ${r===current?'bg-blue-100':''}`}
        >
          {r}
        </li>
      ))}
    </ul>
  );
}