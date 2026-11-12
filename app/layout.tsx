import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "s-bookings",
  },

  description: "web for booking sport center",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "http://localhost:3000",
  },

  openGraph: {
    title: "s-bookings",
    description: "web for bookings area in sportsHub for every place you comes",
    url: "http://localhost:3000",
    siteName: "s.bookings.com",
    images: [
      {
        url: "/images",
        width: 1200,
        height: 630,
        alt: "Deskripsi image",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "s-bookings",
    description: "web for bookings area in sportsHub for every place you comes",
    images: ["/images"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={"h-full antialiased"}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
