import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ulises Pro Insulation Contractor | Tigard, OR",
  description: "Professional attic, crawl space, and blown-in insulation services in Tigard and Greater Portland, Oregon.",
  openGraph: {
    title: "Ulises Pro Insulation Contractor | Tigard, OR",
    description: "Better insulation. Lower bills. Greater comfort.",
    images: [{ url: "https://ulises-pro-insulation-tigard.shohel.chatgpt.site/og.png", width: 1733, height: 909, alt: "Ulises Pro Insulation Contractor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulises Pro Insulation Contractor | Tigard, OR",
    description: "Better insulation. Lower bills. Greater comfort.",
    images: ["https://ulises-pro-insulation-tigard.shohel.chatgpt.site/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
