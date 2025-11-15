import type { Metadata } from "next";
import "../styles/globals.css";
import { SITE_INFO } from "../config/settings";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.rootUrl),
  title: {
    default: SITE_INFO.title,
    template: `%s - ${SITE_INFO.title}`,
  },
  description: SITE_INFO.description,
  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: SITE_INFO.rootUrl,
    siteName: SITE_INFO.title,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@gaaamii",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
