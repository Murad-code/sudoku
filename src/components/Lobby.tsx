interface ILobby {
  roomId: string;
}

export default function Lobby({ roomId }: ILobby) {
  return (
    <>
      <div>Your Room ID is: {roomId}</div>
      <div>
        <h2>Lobby</h2>
        <ul>{}</ul>
        {/* Add lobby content here */}
      </div>
    </>
  );
}
