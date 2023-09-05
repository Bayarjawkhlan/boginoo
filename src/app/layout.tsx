import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/Toaster";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Url shortener",
  description: "Url shortener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className + "h-[100dvh]"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <div className="flex h-screen items-center justify-center">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
