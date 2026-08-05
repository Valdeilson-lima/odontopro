import SessionAuthProvider from "@/components/sessionAuth";
import { Toaster } from "@/components/ui/toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoPro - Sistema de Gestão Odontológica",
  description:
    "Sistema de gestão odontológica completo para clínicas e consultórios, com agendamento, prontuário eletrônico, controle financeiro e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionAuthProvider>
          <Toaster />
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
