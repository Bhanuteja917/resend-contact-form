'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface CookieYesProps {
  cookieYesId: string;
}

// Extend Window interface to include GTM and CookieYes globals
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    cookieyes: {
      getConsent: () => {
        advertisement: boolean;
        analytics: boolean;
        functional: boolean;
      };
    };
  }
}

export default function CookieYes({ cookieYesId }: CookieYesProps) {
  if (!cookieYesId || cookieYesId === 'your_cookieyes_banner_id_here') {
    return null;
  }

  useEffect(() => {
    // Listen for CookieYes consent changes and update GTM consent
    const handleConsentUpdate = () => {
      if (window.cookieyes) {
        const consentData = window.cookieyes.getConsent();

        // Update GTM consent based on CookieYes categories
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'consent_update',
            consent: {
              ad_storage: consentData.advertisement ? 'granted' : 'denied',
              ad_user_data: consentData.advertisement ? 'granted' : 'denied',
              ad_personalization: consentData.advertisement ? 'granted' : 'denied',
              analytics_storage: consentData.analytics ? 'granted' : 'denied',
              functionality_storage: consentData.functional ? 'granted' : 'denied',
              personalization_storage: consentData.functional ? 'granted' : 'denied',
            },
          });

          // Also update using gtag for Google Consent Mode v2
          if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
              ad_storage: consentData.advertisement ? 'granted' : 'denied',
              ad_user_data: consentData.advertisement ? 'granted' : 'denied',
              ad_personalization: consentData.advertisement ? 'granted' : 'denied',
              analytics_storage: consentData.analytics ? 'granted' : 'denied',
              functionality_storage: consentData.functional ? 'granted' : 'denied',
              personalization_storage: consentData.functional ? 'granted' : 'denied',
            });
          }
        }
      }
    };

    // Listen for CookieYes events
    document.addEventListener('cookieyes_consent_update', handleConsentUpdate);

    return () => {
      document.removeEventListener('cookieyes_consent_update', handleConsentUpdate);
    };
  }, []);

  return (
    <Script
      id="cookieyes"
      src={`https://cdn-cookieyes.com/client_data/${cookieYesId}/script.js`}
      strategy="beforeInteractive"
    />
  );
}
