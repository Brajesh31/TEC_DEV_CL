/**
 * Utility functions for responsive design
 */

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Check if the current viewport is mobile
 * @returns True if the viewport is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if the current viewport is tablet
 * @returns True if the viewport is tablet
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

/**
 * Check if the current viewport is desktop
 * @returns True if the viewport is desktop
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Get the current breakpoint
 * @returns The current breakpoint
 */
export const getCurrentBreakpoint = (): string => {
  if (typeof window === 'undefined') return 'lg'; // Default for SSR
  
  const width = window.innerWidth;
  
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  return '2xl';
};

/**
 * Hook to get the current breakpoint and listen for changes
 * @param callback Callback function to run when the breakpoint changes
 * @returns Cleanup function
 */
export const onBreakpointChange = (callback: (breakpoint: string) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  let currentBreakpoint = getCurrentBreakpoint();
  callback(currentBreakpoint);
  
  const handleResize = () => {
    const newBreakpoint = getCurrentBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;
      callback(currentBreakpoint);
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

/**
 * Get a CSS value based on the current breakpoint
 * @param values Object with breakpoint values
 * @param defaultValue Default value if no breakpoint matches
 * @returns The value for the current breakpoint
 */
export const getResponsiveValue = <T>(
  values: { [key: string]: T },
  defaultValue: T
): T => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  // Try exact match
  if (values[currentBreakpoint] !== undefined) {
    return values[currentBreakpoint];
  }
  
  // Try to find the closest smaller breakpoint
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  
  for (let i = currentIndex - 1; i >= 0; i--) {
    const breakpoint = breakpointOrder[i];
    if (values[breakpoint] !== undefined) {
      return values[breakpoint];
    }
  }
  
  return defaultValue;
};

export default {
  breakpoints,
  isMobile,
  isTablet,
  isDesktop,
  getCurrentBreakpoint,
  onBreakpointChange,
  getResponsiveValue
};