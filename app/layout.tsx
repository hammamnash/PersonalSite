import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/geist/latin-500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hammam Nashiruddin | Enterprise Architecture Consultant",
  description: "Enterprise architecture consulting grounded in product delivery and data analytics. Meet Moh. Hammam Nashiruddin, based in Greater Jakarta, Indonesia.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
