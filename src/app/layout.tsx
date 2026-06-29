import "./globals.css";

import { Providers } from "@/components/providers/Providers";
import { LoadingScreen } from "@/components/chrome/LoadingScreen";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { ScrollToTop } from "@/components/chrome/ScrollToTop";
import { Navbar } from "@/components/organisms/Navbar";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata, personJsonLd } from "@/lib/metadata";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>
          {/* Skip link — first focusable element */}
          <a
            href="#main-content"
            className="sr-only z-50 rounded-md border border-red-500 bg-background px-4 py-2 font-mono text-sm text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to main content
          </a>

          <LoadingScreen />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />

          {children}

          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
