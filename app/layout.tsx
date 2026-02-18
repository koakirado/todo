import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODOアプリ",
  description: "カテゴリ・期日・優先度付きTODOアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
