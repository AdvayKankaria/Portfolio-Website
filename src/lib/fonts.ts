import { Geist, Geist_Mono } from "next/font/google";

/** Body + UI — clean sans (MASTER §Typography). */
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

/** Display + headings + numbers + buttons — engineered mono. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
