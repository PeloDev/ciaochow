import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ciao Chow",
  description: "Find something to eat!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${inter.className} mx-auto bg-ccGray flex justify-center`}
        >
          <main className="flex min-h-screen flex-col items-center max-w-[500px] w-full justify-center bg-ccGreen text-white">
            <Toaster position="top-center" />
            {children}
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
