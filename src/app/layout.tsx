"use client";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";

const inter = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Online Platform",
  description: "Online Platform For Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <AuthProvider>
            <ChakraProvider>
              <Navbar />
              {children}
            </ChakraProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
