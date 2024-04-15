import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Jerry Febriano",
  description: "Your average comp-sci undergraduate that addicted to black theme.",
  openGraph: {
    url: 'https://yoshi.moe',
    siteName: 'Jerry Febriano',
    images: [
      {
        url: 'https://www.yoshi.moe/yoshi_og.png',
        width: 1200,
        height: 630,
      },
      {
        url: 'https://www.yoshi.moe/yoshi_og.png',
        width: 1200,
        height: 630,
        alt: 'og',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex h-screen justify-center">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
