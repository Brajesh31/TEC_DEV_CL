import { useState, useEffect } from 'react';
import { breakpoints, getCurrentBreakpoint } from '../utils/responsiveUtils';

/**
 * Hook to get responsive information and handle window resize event
 * @returns Object with responsive information
 */
export const useResponsive = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(getCurrentBreakpoint());
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setCurrentBreakpoint(getCurrentBreakpoint());
    };
    
    // Set initial values
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return {
    breakpoint: currentBreakpoint,
    windowSize,
    isMobile: currentBreakpoint === 'xs' || currentBreakpoint === 'sm',
    isTablet: currentBreakpoint === 'md',
    isDesktop: currentBreakpoint === 'lg' || currentBreakpoint === 'xl' || currentBreakpoint === '2xl',
    isLargeDesktop: currentBreakpoint === 'xl' || currentBreakpoint === '2xl',
    breakpoints
  };
};

export default useResponsive;