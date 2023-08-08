import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col text-center">
      <h1 className="mx-auto mt-20 text-4xl">Welcome to Sudoku!</h1>
      <div className="flex flex-col mx-24 items-center mt-20 space-y-6">
        <Link
          className="p-6 bg-red-400 hover:bg-red-500 rounded text-white w-64 drop-shadow-sm"
          href="/puzzle"
        >
          Play Sudoku
        </Link>
        <Link
          className="p-6 bg-blue-400 hover:bg-blue-500 rounded text-white w-64 drop-shadow-sm"
          href="/join"
        >
          Find Game
        </Link>
        <Link
          className="p-6 bg-green-400 hover:bg-green-500 rounded text-white w-64 drop-shadow-sm"
          href="/host"
        >
          Host Game
        </Link>
      </div>
    </div>
  );
}
