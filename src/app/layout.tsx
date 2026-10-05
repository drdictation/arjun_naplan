import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arjun's NAPLAN Year 3 Spelling Master",
  description: "Spaced Repetition & Audio Dictation spelling app for Year 3 NAPLAN",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NAPLAN Spelling",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental pinch zoom on iPad inputs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
