import React, { useState } from 'react';
import { Mail, CheckCircle, Loader, Bell } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'inline' | 'modal' | 'footer';
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  className = '', 
  variant = 'inline' 
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  // EmailJS configuration for newsletter
  const EMAILJS_SERVICE_ID = 'service_u1ipj53';
  const EMAILJS_TEMPLATE_ID = 'template_z52czjb';
  const EMAILJS_PUBLIC_KEY = '9cs7aPOWndb7SKcvJ';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate email
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        to_name: 'Tech Dev Club Team',
        from_name: firstName || 'Subscriber',
        from_email: email,
        subject: 'New Newsletter Subscription',
        message: `New newsletter subscription from ${email}${firstName ? ` (${firstName})` : ''}.`,
      };

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubscribed(true);
        setEmail('');
        setFirstName('');
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className={`text-center p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 rounded-lg ${className}`}>
        <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4 animate-pulse" />
        <h3 className="text-base sm:text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Welcome to our community!
        </h3>
        <p className="text-green-600 dark:text-green-300 text-sm">
          You've successfully subscribed to our newsletter. Check your email for a welcome message!
        </p>
      </div>
    );
  }

  const isCompact = variant === 'footer';

  return (
    <div className={`${className}`}>
      {variant === 'modal' && (
        <div className="text-center mb-6">
          <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 dark:text-primary-400 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get the latest tech insights, event updates, and community news delivered to your inbox.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {!isCompact && (
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              First Name (Optional)
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Your first name"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center shadow-md hover:shadow-lg ${
            isCompact ? 'py-2 px-3 text-sm' : 'py-2 sm:py-3 px-4 sm:px-6'
          }`}
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Subscribe to Newsletter
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;