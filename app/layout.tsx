import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/GoogleTagManagerNoScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contact Form - Get in Touch",
  description: "Send us a message and we'll get back to you soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-KP4NFN3Q" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoScript gtmId="GTM-KP4NFN3Q" />
        {children}
      </body>
    </html>
  );
}
