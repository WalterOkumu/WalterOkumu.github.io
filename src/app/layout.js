import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ENV, logEnvironmentStatus } from "@/lib/env";
import ConsentAndAnalytics from "@/components/ui/ConsentAndAnalytics";

// Inter font configuration as per design specification
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Walter Okumu Oriaro",
  "alternateName": "Walter Oriaro",
  "jobTitle": "Head of Customer Success & Technical Architecture",
  "worksFor": {
    "@type": "Organization",
    "name": "Yellow Pages Group"
  },
  "url": ENV.SITE_URL,
  "sameAs": [
    ENV.LINKEDIN_URL,
    ENV.GITHUB_URL
  ],
  "knowsAbout": [
    "Customer Success Operations",
    "Technical Architecture",
    "International Team Leadership",
    "Web Development",
    "API Infrastructure",
    "DevOps & CI/CD",
    "React.js & Next.js",
    "Node.js Development",
    "PostgreSQL & MongoDB",
    "AWS Cloud Infrastructure",
    "International Operations",
    "Cross-Border Team Management",
    "Customer Success Strategy",
    "Digital Transformation",
    "SEO & Performance Optimization",
    "Multi-Country Operations",
    "Team Development",
    "Process Optimization",
    "Revenue Growth Strategy",
    "Technical Infrastructure"
  ],
  "nationality": "Kenyan",
  "workLocation": {
    "@type": "Place",
    "name": "Nairobi, Kenya"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": ENV.EMAIL,
    "telephone": ENV.PHONE,
    "contactType": "professional"
  }
};

export const metadata = {
  title: {
    default: "Walter Okumu Oriaro | Chief AI Officer & International Technology Executive",
    template: "%s | Walter Okumu Oriaro - Chief AI Officer"
  },
  description: "Chief AI Officer driving AI transformation with $2.3M revenue impact, leading international technology operations across 7 countries with 12 direct reports, 40% customer satisfaction improvement, and 78% deployment error reduction.",
  keywords: [
    // Executive Identity Keywords
    "Walter Okumu Oriaro",
    "Walter Oriaro",
    "Head of Customer Success",
    "Technical Architecture",
    "Technology Executive",
    "Customer Success Leadership",
    "Technical Infrastructure",
    "International Operations",
    "Team Leadership",
    "Yellow Pages Group",

    // Leadership & Management
    "International Team Management",
    "Cross-Border Operations",
    "12-Person Team Leadership",
    "7 Countries Management",
    "Remote Team Leadership",
    "Distributed Operations",
    "Customer Success Strategy",
    "Process Optimization",
    "Team Development",
    "Leadership Excellence",

    // Technical Expertise
    "Technical Architecture",
    "Web Development",
    "React.js Development",
    "Next.js Development",
    "Node.js Development",
    "API Infrastructure",
    "DevOps & CI/CD",
    "AWS Cloud Services",
    "PostgreSQL Database",
    "MongoDB Database",
    "Docker & Kubernetes",
    "Performance Optimization",

    // Customer Success & Operations
    "Customer Success Operations",
    "Customer Satisfaction",
    "Process Design",
    "Onboarding Optimization",
    "Customer Success Metrics",
    "Revenue Optimization",
    "Upsell Strategy",
    "Customer Relationship Management",
    "International Customer Support",
    "Customer Success Analytics",

    // Industry & Location
    "Kenya Technology Leader",
    "Nairobi Technology Executive",
    "East Africa Technology",
    "African Technology Leadership",
    "Yellow Pages Group",
    "International Business Directory",
    "Digital Marketing Technology",
    "E-commerce Technology",

    // Measurable Achievements
    "40% Customer Satisfaction Improvement",
    "78% Deployment Error Reduction",
    "23% Upsell Revenue Growth",
    "99.8% System Uptime",
    "5M+ Monthly Users",
    "International Operations",
    "Multi-Country Success",
    "Technical Excellence",

    // Technical Architecture
    "Full-Stack Web Development",
    "React.js & Next.js",
    "Node.js Development",
    "AWS Cloud Services",
    "Cloud Infrastructure",
    "Serverless Solutions",
    "Microservices Architecture",
    "Modern Tech Stack",
    "DevOps Pipeline",
    "CI/CD Deployment",

    // Executive Skills
    "Executive Presentation",
    "Board-Level Reporting",
    "Budget Management",
    "Vendor Management",
    "Risk Assessment",
    "Compliance Management",
    "Team Scaling",
    "Talent Acquisition",
    "Skills Development",
    "Executive Communication"
  ],
  authors: [{ name: "Walter Okumu Oriaro", url: ENV.SITE_URL }],
  creator: "Walter Okumu Oriaro",
  publisher: "Walter Okumu Oriaro",

  metadataBase: new URL(ENV.SITE_URL),

  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-GB': '/',
    }
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Walter Okumu Oriaro - Chief AI Officer & International Technology Executive',
    description: 'AI transformation leader with $2.3M revenue impact, leading international teams across 7 countries. 40% customer satisfaction improvement and 78% deployment error reduction.',
    siteName: 'Walter Okumu Oriaro - Technology Executive Portfolio',
    images: [
      {
        url: '/walter-okumu.webp',
        width: 1200,
        height: 630,
        alt: 'Walter Okumu Oriaro - Technology Executive Portfolio'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    site: '@walter_oriaro',
    creator: '@walter_oriaro',
    title: 'Walter Okumu Oriaro - Chief AI Officer & International Technology Executive',
    description: 'AI transformation leader with $2.3M revenue impact and international team leadership across 7 countries.',
    images: ['/walter-okumu.webp']
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: ENV.GOOGLE_SITE_VERIFICATION,
    yandex: ENV.YANDEX_VERIFICATION,
    bing: ENV.BING_VERIFICATION,
  },

  category: 'technology',
  classification: 'Executive Portfolio',

  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION,
    'yandex-verification': process.env.YANDEX_VERIFICATION,
    'msvalidate.01': process.env.BING_VERIFICATION,
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ]
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />

        {/* Site Verification */}
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        <meta name="yandex-verification" content={process.env.YANDEX_VERIFICATION} />
        <meta name="msvalidate.01" content={process.env.BING_VERIFICATION} />

        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Walter Oriaro" />

        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://walterokumu.github.io/walter-okumu-portfolio"} />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Basic CSP for static export (adjust as needed) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={
            "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' https://www.googletagmanager.com https://mc.yandex.ru 'unsafe-inline'; connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
          }
        />
      </head>

      <body className="font-sans antialiased bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
        <ConsentAndAnalytics />
      </body>
    </html>
  );
}
