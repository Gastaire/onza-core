import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/components/features/auth/AuthContext";
import SmoothScrolling from "@/components/SmoothScrolling";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnzaCore | Luxury Software Factory",
  description: "High-end IT solutions and intelligent automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans bg-background text-foreground overflow-hidden antialiased selection:bg-accent selection:text-background`}>
        <AuthProvider>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </AuthProvider>
      </body>
    </html>
  );
}
