import type { Metadata } from "next";
// import localFont from "next/font/local"; // Removing local font for now
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/shared/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FeedCreator - Create Summary Cards in Seconds",
  description: "Turn any URL or text into a beautiful shareable summary card.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">
           {children}
        </main>
      </body>
    </html>
  );
}
