import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LINEA — Professional PDR & Automotive Tools",
  description: "Ferramentas profissionais de PDR e automotivas, entrega mundial.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
