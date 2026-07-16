import type { Metadata, Viewport } from "next";
import "./globals.css";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Sentient HQ — Agency Hub",
  description:
    "An interactive isometric hub for exploring Sentient Agency's seven working zones.",
  icons: {
    icon: `${assetBase}/favicon.png`,
    shortcut: `${assetBase}/favicon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
