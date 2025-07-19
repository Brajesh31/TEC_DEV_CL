import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../services/analyticsService';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route changes
    const pageName = location.pathname.replace('/', '') || 'home';
    const pageTitle = document.title;
    
    analyticsService.trackPageView(pageName, pageTitle);
  }, [location]);

  return analyticsService;
};

export default useAnalytics;