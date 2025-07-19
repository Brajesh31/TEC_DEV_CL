import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
    message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
    const [dots, setDots] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Animation for the dots
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 400);

        // Set a timeout to hide the loading screen after a short delay
        // This helps with perceived performance
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <img
                src="/logo.png"
                alt="Tech Dev Club Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 drop-shadow-lg rounded-full animate-pulse"
                draggable={false}
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Tech Dev Club
            </h1>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center">
                <span>{message}</span>
                <span className="w-8 inline-block">{dots}</span>
            </div>
            <div className="mt-4 sm:mt-6 w-32 sm:w-40 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-shimmer"
                    style={{
                        backgroundSize: '200% 100%',
                        backgroundImage: 'linear-gradient(to right, #2563eb, #0d9488, #2563eb)',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingScreen;