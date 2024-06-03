import type { Metadata } from "next";
import { Inter, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

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
  title: "SoccerTeria || The best online lottery app",
  description: "The best online lottery app where you can win amazing prizes for your favourite teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} ${manrope.className} ${montserrat.className} `}>{children}</body>
        </html>
      </ClerkProvider>
    </ReactQueryClientProvider>
  );
}
