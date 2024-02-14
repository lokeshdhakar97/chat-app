import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Together | Chat App",
  description: "Chat with your friends and family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main
            className="w-screen h-screen bg-slate-100 flex justify-center
          items-center"
          >
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
