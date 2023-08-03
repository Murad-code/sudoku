import Link from "next/link";
import "./globals.css";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata = {
  title: "Sudoku!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fredoka.className}>
        <div className="bg-[#ffffff]">
          <nav className="flex flex-col md:flex-row justify-between items-center p-4 pt-6 md:p-12 md:py-6 bg-[#f7f7f8]">
            <div className="flex items-center">
              <Link href="/" className="group">
                <span className="text-4xl font-semibold text-blue-400 group-hover:text-blue-500">
                  Multi
                </span>
                <span className="text-green-400 group-hover:text-green-500 text-4xl">
                  Doku
                </span>
              </Link>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Link
                href="/puzzle"
                className="px-6 py-2 m-2 bg-red-400 text-lg hover:bg-red-500 rounded text-white"
              >
                Puzzle
              </Link>
              <Link
                href="/host"
                className="px-6 py-2 m-2 bg-green-400 text-lg hover:bg-green-500 rounded text-white"
              >
                Host
              </Link>
              <Link
                href="/join"
                className="px-6 py-2 m-2 bg-blue-400 hover:bg-blue-500 rounded text-white text-lg"
              >
                Join
              </Link>
            </div>
          </nav>

          {children}
        </div>
      </body>
    </html>
  );
}
