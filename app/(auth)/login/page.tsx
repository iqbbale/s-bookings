import { CardLogin } from "@/modules/auth/card-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",

  description: "Page for user login",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "http://localhost:3000/login",
  },

  openGraph: {
    title: "Login",
    description: "login into website",
    url: "http://localhost:3000/login",
    siteName: "Login Into SportsHubs",
    images: [
      {
        url: "images/",
        width: 1200,
        height: 630,
        alt: "description images",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Login",
    description: "Login into this link",
    images: ["/images"],
  },
};

export default function Login() {
  return (
    <div className="">
      <div className="flex justify-center items-center h-screen">
        <CardLogin />
      </div>
    </div>
  );
}
