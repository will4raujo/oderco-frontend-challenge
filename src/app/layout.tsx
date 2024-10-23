import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: '%s | w.a. store',
    default: 'w.a. store',
  }
}

const roboto = Roboto({
  subsets: ["latin"],
  variable: '--font-roboto',
  weight: "400"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={roboto.variable}>
      <body className={`antialiased text-zinc-950 `}>
        {children}
      </body>
    </html>
  );
}
