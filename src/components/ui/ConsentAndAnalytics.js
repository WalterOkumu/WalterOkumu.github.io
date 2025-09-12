'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ConsentAndAnalytics() {
  const [consent, setConsent] = useState(null); // null | true | false

  useEffect(() => {
    try {
      const saved = localStorage.getItem('analytics_consent');
      if (saved === 'granted') setConsent(true);
      else if (saved === 'denied') setConsent(false);
      else setConsent(null);
    } catch {}
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('analytics_consent', 'granted');
      setConsent(true);
    } catch {}
  };

  const decline = () => {
    try {
      localStorage.setItem('analytics_consent', 'denied');
      setConsent(false);
    } catch {}
  };

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <>
      {consent === null && (
        <div data-cookie-notice className="fixed inset-x-0 bottom-0 z-50 p-4">
          <div className="mx-auto max-w-4xl rounded-lg shadow-lg bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-sm text-gray-700 dark:text-gray-200 flex-1">
                This site uses analytics and Web Vitals to improve performance. Consent enables anonymous usage metrics.
              </p>
              <div className="flex gap-2">
                <button onClick={decline} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm">
                  Decline
                </button>
                <button onClick={accept} className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {consent && (
        <>
          {GA_ID && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { anonymize_ip: true });
                `}
              </Script>
            </>
          )}

          {YM_ID && (
            <Script id="ym-init" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                ym(${YM_ID}, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true });
              `}
            </Script>
          )}

          <Script id="web-vitals" strategy="afterInteractive">
            {`
              function sendToAnalytics(metric){
                if (typeof window.gtag !== 'undefined') {
                  window.gtag('event', metric.name, {
                    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                    event_category: 'Web Vitals',
                    event_label: metric.id,
                    non_interaction: true,
                  });
                }
                if (typeof window.ym !== 'undefined' && ${YM_ID ? 'true' : 'false'}) {
                  window.ym(${YM_ID || '0'}, 'reachGoal', 'web_vitals', { name: metric.name, value: metric.value, id: metric.id });
                }
              }
              import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({getCLS,getFID,getFCP,getLCP,getTTFB,getINP})=>{
                getCLS(sendToAnalytics);getFID(sendToAnalytics);getFCP(sendToAnalytics);getLCP(sendToAnalytics);getTTFB(sendToAnalytics);getINP(sendToAnalytics);
              }).catch(()=>{});
            `}
          </Script>
        </>
      )}
    </>
  );
}

