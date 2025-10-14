import type { Metadata } from "next";
import { Bebas_Neue, Nunito, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue", // creates a CSS variable
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700"], // normal and bold weights
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "AceEight",
  description: "Redefining Everyday Fashion",
  icons: {
    icon: "/logo/whitel.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${nunito.variable} ${inter.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
