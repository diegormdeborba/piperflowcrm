import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://piperflowcrm.vercel.app"

export const metadata: Metadata = {
  title: {
    default: "PipeFlow CRM — Gestão de vendas simples e poderosa",
    template: "%s | PipeFlow CRM",
  },
  description:
    "CRM com pipeline Kanban, gestão de leads, métricas de vendas e colaboração em equipe. Comece grátis.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: "PipeFlow CRM",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
