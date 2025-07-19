// Simple analytics service without Firebase dependency
class AnalyticsService {
  private isEnabled = false;

  constructor() {
    // Enable analytics in production or when explicitly configured
    this.isEnabled = import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
  }

  // Track page views
  trackPageView(pageName: string, pageTitle?: string) {
    if (!this.isEnabled) return;
    
    // Use Google Analytics gtag if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: pageTitle || pageName,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
    
    // Console log for development
    if (import.meta.env.DEV) {
      console.log('📊 Page View:', { pageName, pageTitle, path: window.location.pathname });
    }
  }

  // Track user event
  trackEvent(eventName: string, parameters?: { [key: string]: any }) {
    if (!this.isEnabled) return;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }
    
    if (import.meta.env.DEV) {
      console.log('📊 Event:', eventName, parameters);
    }
  }

  // Track user signup
  trackSignup(method: string = 'email') {
    this.trackEvent('sign_up', {
      method,
    });
  }

  // Track user login
  trackLogin(method: string = 'email') {
    this.trackEvent('login', {
      method,
    });
  }

  // Track event RSVP
  trackEventRSVP(eventId: string, eventName: string) {
    this.trackEvent('rsvp_event', {
      event_id: eventId,
      event_name: eventName,
    });
  }

  // Track newsletter subscription
  trackNewsletterSubscription() {
    this.trackEvent('newsletter_subscribe');
  }

  // Track project submission
  trackProjectSubmission(projectType: string) {
    this.trackEvent('project_submit', {
      project_type: projectType,
    });
  }

  // Track volunteer application
  trackVolunteerApplication(role: string) {
    this.trackEvent('volunteer_apply', {
      volunteer_role: role,
    });
  }

  // Set user properties
  setUserProperties(properties: { [key: string]: any }) {
    if (!this.isEnabled) return;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: properties,
      });
    }
    
    if (import.meta.env.DEV) {
      console.log('📊 User Properties:', properties);
    }
  }

  // Track user engagement
  trackEngagement(action: string, category: string) {
    this.trackEvent('engagement', {
      action,
      category,
    });
  }
}

export const analyticsService = new AnalyticsService();
export default AnalyticsService;