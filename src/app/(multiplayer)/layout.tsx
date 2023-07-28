// NOTE: this is for dev purposes to jump back to /host or /join quickly

import Link from "next/link";
export const metadata = {
  title: "Dev",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex justify-center gap-x-8 p-8">
        <Link
          className="p-3 px-8 bg-green-500 hover:bg-green-700 rounded text-white"
          href="/host"
        >
          Host
        </Link>
        <Link
          className="p-3 px-8 bg-blue-500 hover:bg-blue-700 rounded text-white"
          href="/join"
        >
          Join
        </Link>
      </nav>

      {children}
    </div>
  );
}
