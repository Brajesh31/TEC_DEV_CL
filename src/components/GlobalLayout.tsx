import React, { ReactNode, useEffect } from 'react';
import SeoBacklinks from './SeoBacklinks';

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  // This effect handles the browser history to ensure page refreshes work correctly
  useEffect(() => {
    // Save the current URL to localStorage when navigating
    const handleBeforeUnload = () => {
      localStorage.setItem('lastPath', window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Initialize currentPath if it doesn't exist
    if (!localStorage.getItem('currentPath')) {
      localStorage.setItem('currentPath', window.location.pathname);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="flex-1 w-full max-w-[2000px] mx-auto">
        {children}
      </main>
      <SeoBacklinks />
    </div>
  );
};

export default GlobalLayout;