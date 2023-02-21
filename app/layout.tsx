import { getServerSession } from "next-auth";
import ClientProvider from "../components/ClientProvider";
import Login from "../components/Login";
import { SessionProvider } from "../components/SessionProvider";
import Sidebar from "../components/Sidebar";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html>
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex overflow-x-hidden">
              <Sidebar />
              <ClientProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
