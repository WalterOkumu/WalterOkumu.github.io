import { Inter, Poppins, Roboto, Fira_Code } from 'next/font/google';

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
    title: 'Walter Okumu Oriaro - Technical Customer Success Architect',
    description:
      'Bridging technical architecture and customer success. Expert in Next.js, Node.js, ' +
      'AI automation, and global SaaS solutions.',
    images: ['/twitter-image.jpg'],
    creator: '@your-handle',
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

  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },

  // App configurations
  manifest: '/manifest.json',

  // Alternate languages (if needed in future)
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com',
  },

  // Other metadata
  other: {
    'theme-color': '#2f5e91',
    'color-scheme': 'light dark',
    'format-detection': 'telephone=no',
  },
};

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://www.google-analytics.com' />
        <link rel='preconnect' href='https://mc.yandex.ru' />
        <link rel='preconnect' href='https://www.clarity.ms' />

        {/* DNS prefetch for external resources */}
        <link rel='dns-prefetch' href='https://calendly.com' />
        <link rel='dns-prefetch' href='https://github.com' />
        <link rel='dns-prefetch' href='https://linkedin.com' />

        {/* Structured Data - Organization */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Walter Okumu Oriaro',
              jobTitle: 'Technical Customer Success Architect & Full-Stack Engineer',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com',
              sameAs: [
                process.env.NEXT_PUBLIC_LINKEDIN_URL,
                process.env.NEXT_PUBLIC_GITHUB_URL,
                process.env.NEXT_PUBLIC_TWITTER_URL,
              ].filter(Boolean),
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://walterokumu.com'}/profile-image.jpg`,
              description:
                'Technical Customer Success Architect and Full-Stack Engineer with expertise in ' +
                'bridging technical solutions and customer success outcomes.',
              knowsAbout: [
                'Technical Customer Success',
                'Full-Stack Development',
                'Next.js',
                'React',
                'Node.js',
                'JavaScript',
                'AI Automation',
                'SaaS Solutions',
                'Customer Success Engineering',
              ],
              alumniOf: {
                '@type': 'Organization',
                name: 'Your University/Institution',
              },
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance/Consultant',
                description: 'Independent Technical Customer Success Architect',
              },
            }),
          }}
        />
      </head>
      <body className='min-h-screen font-serif antialiased'>
        {/* Skip to main content for accessibility */}
        <a
          href='#main-content'
          className='skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:shadow-lg'
        >
          Skip to main content
        </a>

        {/* Main application content */}
        <div id='main-content' className='relative'>
          {children}
        </div>

        {/* Accessibility enhancements */}
        <div
          id='aria-live-region'
          aria-live='polite'
          aria-atomic='true'
          className='sr-only'
        />

        {/* Analytics scripts will be added here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
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
                    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
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
            {process.env.NEXT_PUBLIC_CLARITY_ID && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
                  `,
                }}
              />
            )}
          </>
        )}
      </body>
    </html>
  );
}
