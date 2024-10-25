import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
const StoreProvider = dynamic(() => import("./StoreProvider"), {
  ssr: false,
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nagorik Movies",
  description: "Popular Movies | Movie Recommendation | Movie Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black dark:text-white`}
      >
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
