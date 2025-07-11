import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LoadingProvider } from "@/context/LoadingContext";
import ToastContainer from "@/components/ToastContainer";
import ToastProviderHot from "@/components/ToastProvider";
import AppContent from "@/components/AppContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Humano Seguros - Registro",
  description: "Mini-aplicación de registro/login para Humano Seguros",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#F5F7FA] transition-colors duration-300`}
      >
          <LanguageProvider>
            <ToastProvider>
              <LoadingProvider>
                <AuthProvider>
                  <AppContent>
                    {children}
                  </AppContent>
                  <ToastContainer />
                  <ToastProviderHot />
                </AuthProvider>
              </LoadingProvider>
            </ToastProvider>
          </LanguageProvider>
      </body>
    </html>
  );
}
