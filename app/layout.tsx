import type { Metadata } from "next";
import Figtree from "next/font/local";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getAudiobooksByUserId from "@/actions/getAudiobooksByUserId";
import Player from "@/components/Player";

const geistSans = Figtree({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = Figtree({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Read-books",
  description: "Listen to people read books",
};

export const revalidate=0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAudiobooks = await getAudiobooksByUserId();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
        <Sidebar audiobooks={userAudiobooks}>
         {children}
      </Sidebar>
      <Player />
      </UserProvider>
      </SupabaseProvider>
      </body>
    </html>
  );
}
