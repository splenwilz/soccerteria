import type { Metadata } from "next";
import { Inter, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({
  variable: '--font-manrope',
  display: 'auto',
  preload: false,
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'auto',
  preload: false,
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${manrope.className} ${montserrat.className} `}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
