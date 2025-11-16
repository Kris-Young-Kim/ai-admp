import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";
import { Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";
import { SyncUserProvider } from "@/components/providers/sync-user-provider";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 보조기기 매칭",
  description: "AI가 당신에게 가장 적합한 보조기기를 추천해드립니다",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <body
          className={`${geistMono.variable} font-sans antialiased`}
        >
          <AnalyticsProvider>
            <SyncUserProvider>
              <Navbar />
              {children}
            </SyncUserProvider>
          </AnalyticsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
