import { Inter, Poppins, Roboto, Fira_Code } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import './globals.css';

// Brand fonts configuration from Brand Guide
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

// Enhanced SEO metadata
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com'),
  title: {
    default: 'Walter Okumu Oriaro - Technical Customer Success Architect & Full-Stack Engineer',
    template: '%s | Walter Okumu Oriaro',
  },
  description:
    'Technical Customer Success Architect and Full-Stack Engineer bridging the gap between ' +
    'technical architecture and customer success. Specializing in Next.js, Node.js, AI automation, ' +
    'and global SaaS solutions.',
  keywords: [
    'Technical Customer Success',
    'Full-Stack Developer',
    'Next.js',
    'Node.js',
    'AI Automation',
    'Customer Success Engineer',
    'SaaS Consultant',
    'React Developer',
    'Tailwind CSS',
    'JavaScript',
  ],
  authors: [{ name: 'Walter Okumu Oriaro' }],
  creator: 'Walter Okumu Oriaro',
  publisher: 'Walter Okumu Oriaro',
  category: 'Technology',
  classification: 'Portfolio Website',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com',
    siteName: 'Walter Okumu Oriaro',
    title: 'Walter Okumu Oriaro - Technical Customer Success Architect',
    description:
      'Bridging technical architecture and customer success. Expert in Next.js, Node.js, ' +
      'AI automation, and global SaaS solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Walter Okumu Oriaro - Technical Customer Success Architect',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@walterokumu',
    creator: '@walterokumu',
    title: 'Walter Okumu Oriaro - Technical Customer Success Architect',
    description:
      'Bridging technical architecture and customer success. Expert in Next.js, Node.js, ' +
      'AI automation, and global SaaS solutions.',
    images: ['/og-image.jpg'],
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com',
    types: {
      'application/rss+xml': [
        {
          url: '/rss',
          title: 'Walter Okumu Oriaro - Blog RSS Feed',
        },
      ],
    },
  },
  other: {
    'msapplication-TileColor': '#2F5E91',
    'theme-color': '#2F5E91',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Walter Okumu Oriaro',
  jobTitle: 'Technical Customer Success Architect & Full-Stack Engineer',
  description:
    'Technical Customer Success Architect and Full-Stack Engineer bridging the gap between ' +
    'technical architecture and customer success.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com',
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com'}/og-image.jpg`,
  sameAs: [
    'https://linkedin.com/in/walterokumu',
    'https://github.com/walterokumu',
    'https://twitter.com/walterokumu',
  ],
  knowsAbout: [
    'Technical Customer Success',
    'Full-Stack Development',
    'Next.js',
    'Node.js',
    'AI Automation',
    'SaaS Solutions',
    'Customer Success Engineering',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KE',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${firaCode.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://clarity.microsoft.com" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Yandex Metrica */}
        {process.env.NEXT_PUBLIC_YANDEX_METRICA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${process.env.NEXT_PUBLIC_YANDEX_METRICA_ID}, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
              `,
            }}
          />
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
