import type { Metadata } from "next";
import { Onest } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const font = Onest({
  subsets: ["latin"],
});

const monocraft = localFont({
  src: "Monocraft.otf",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "pack.ltrx.lol",
  description: "merge your resource packs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://wsrv.nl/?url=https%3A%2F%2Femoji-cdn.mqrio.dev%2F%F0%9F%93%A6%3Fstyle%3Dgoogle&w=128"
        />
      </head>
      <body
        className={`${font.className} antialiased ${monocraft.variable} overflow-y-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
