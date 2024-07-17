import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "homespark",
  description: "AI powered platform for apartment hunting in Almaty",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="description" content="AI powered platform for apartment hunting in Almaty" />
      <body className={roboto.className}>
        {children}
        <Analytics />
        </body>
    </html>
  );
}
