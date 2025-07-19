import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nike Impact Collection Showcase",
  description:
    "Explore the Nike Impact Collection featuring interactive views, customizable sizes and colors, and a dynamic shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
