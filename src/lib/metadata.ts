import type { Metadata } from "next";

import { person, social } from "@/data/placeholder";
import { SITE_URL } from "@/lib/constants";

/** Site-wide metadata, sourced entirely from placeholder.ts. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${person.name}`,
    default: `${person.name} — ${person.title}`,
  },
  description: person.bio,
  keywords: [
    person.name,
    person.title,
    "software engineer",
    "portfolio",
    "web development",
    "systems engineering",
    "WebGL",
  ],
  authors: [{ name: person.name, url: social.website }],
  creator: person.name,
  openGraph: {
    title: `${person.name} — ${person.title}`,
    description: person.bio,
    url: SITE_URL,
    siteName: `${person.name} — Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.title}`,
    description: person.bio,
    creator: social.twitter.split("/").pop() ?? person.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: SITE_URL },
};

/** JSON-LD Person structured data. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.title,
    description: person.bio,
    email: `mailto:${person.email}`,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.location,
    },
    sameAs: [social.github, social.linkedin, social.twitter, social.website],
  };
}
