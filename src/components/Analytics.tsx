import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function Analytics({ measurementId }: { measurementId: string }) {
  const location = useLocation();

  useEffect(() => {
    // Track page views when route changes
    window.gtag('config', measurementId, {
      page_path: location.pathname + location.search
    });
  }, [location, measurementId]);

  return null;
}