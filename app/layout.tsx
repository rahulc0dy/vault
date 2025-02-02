import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

const karla = localFont({
  src: "../fonts/Karla-VariableFont_wght.ttf",
  preload: true,
  adjustFontFallback: "Arial",
  display: "swap",
});

const sourceCodePro = localFont({
  src: "../fonts/SourceCodePro-VariableFont_wght.ttf",
  display: "swap",
  preload: true,
  variable: "--font-source-code-pro",
});

const playwrite = localFont({
  src: "../fonts/PlaywriteIN-VariableFont_wght.ttf",
  display: "swap",
  preload: true,
  variable: "--font-playwrite",
});

export const metadata: Metadata = {
  title: "c0dy_blogs",
  description: "Blog app from rahulc0dy | Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playwrite.variable} ${sourceCodePro.variable}`}
      data-theme="light"
    >
      <body
        className={`${karla.className} min-h-screen bg-white text-zinc-950 antialiased dark:bg-zinc-950 dark:text-teal-50`}
      >
        <NavBar />
        <main className="wrapper py-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
