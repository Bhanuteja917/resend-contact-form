import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import CookieYes from "@/components/CookieYes";

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
  const cookieYesId = process.env.NEXT_PUBLIC_COOKIEYES_ID || '';

  return (
    <html lang="en">
      <head>
        {/* CookieYes - Load before GTM for consent management */}
        <CookieYes cookieYesId={cookieYesId} />

        {/* Google Tag Manager with Consent Mode */}
        <GoogleTagManager gtmId={gtmId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM noscript fallback */}
        <GoogleTagManagerNoScript gtmId={gtmId} />

        {children}
      </body>
    </html>
  );
}
