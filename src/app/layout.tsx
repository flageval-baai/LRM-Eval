import type { Metadata } from "next";
import { Inter, Roboto, Open_Sans, Poppins } from "next/font/google";  // Import multiple font options
import "./globals.css";
import { getBasePath } from "@/utils/fileUtils";

// Option 1: Inter 
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Option 2: Roboto 
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

// Option 3: Open Sans
const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
});

//Option 4: Poppins 
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const currentFont = inter;

export const metadata: Metadata = {
  title: "LRM-Eval",
  description: "A Preliminary Contamination-Free Evaluation of Reasoning Models",
  icons: {
    icon: [
      { url: `${getBasePath()}/flageval.png` }
    ],
    apple: [
      { url: `${getBasePath()}/flageval.png` }
    ],
    shortcut: [`${getBasePath()}/flageval.png`]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${currentFont.variable} antialiased font-sans`}  // Apply the selected font here
      >
        {children}
      </body>
    </html>
  );
}