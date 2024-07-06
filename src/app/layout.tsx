import Nav from "@/components/Nav";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weight Loss Calculator",
  description: "Calculate how long it will take to reach your goal weight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-G5MY6MJMD7" />

      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
