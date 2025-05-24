import type { Metadata } from "next";
import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { ClientLayout } from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudHive - Feature Idea Portal",
  description: "Submit and vote on feature ideas for Integration Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
