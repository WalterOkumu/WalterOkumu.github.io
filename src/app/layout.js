import { Inter, Roboto, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata = {
  title: "Walter Okumu Oriaro - Technical Customer Success Architect",
  description: "Technical Customer Success Architect bridging engineering excellence with customer satisfaction. Full-stack development, AI automation, and customer success solutions.",
  keywords: ["Technical Customer Success", "Full-Stack Developer", "AI Automation", "Next.js", "Customer Success Architect", "Walter Okumu"],
  authors: [{ name: "Walter Okumu Oriaro" }],
  creator: "Walter Okumu Oriaro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://walterokumu.github.io",
    title: "Walter Okumu Oriaro - Technical Customer Success Architect",
    description: "Technical Customer Success Architect bridging engineering excellence with customer satisfaction. Full-stack development, AI automation, and customer success solutions.",
    siteName: "Walter Okumu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walter Okumu Oriaro - Technical Customer Success Architect",
    description: "Technical Customer Success Architect bridging engineering excellence with customer satisfaction.",
    creator: "@walterokumu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/rss', title: 'Walter Okumu Blog RSS Feed' },
      ],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Walter Okumu Blog RSS Feed" href="/rss" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} ${firaCode.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}