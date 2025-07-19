/**
 * Configuration for Hostinger deployment
 * This file contains settings specific to Hostinger hosting
 */

export const HOSTINGER_CONFIG = {
  // Base URL for the application when deployed on Hostinger
  BASE_URL: 'https://techdevclub.com',
  
  // API endpoints
  API_ENDPOINTS: {
    BASE: '/api',
    EVENTS: '/api/event',
    AUTH: '/api/auth',
    USERS: '/api/users',
    RSVP: '/api/rsvp',
    COMMUNITY: '/api/community',
  },
  
  // Hostinger-specific settings
  HOSTING: {
    // For SPA routing - ensures all routes redirect to index.html
    USE_HTACCESS: true,
    
    // Cache settings
    CACHE_CONTROL: 'public, max-age=3600', // 1 hour
    
    // Custom domain settings
    CUSTOM_DOMAIN: true,
    DOMAIN_NAME: 'techdevclub.com',
    
    // SSL settings
    SSL_ENABLED: true,
  }
};

/**
 * Generate .htaccess content for SPA routing on Hostinger
 * This ensures that all routes are handled by the React Router
 */
export const generateHtaccess = (): string => {
  return `
# Enable Rewrite Engine
RewriteEngine On

# Handle Front Controller Pattern for SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L,QSA]

# Set security headers
<IfModule mod_headers.c>
  # Protect against XSS attacks
  Header set X-XSS-Protection "1; mode=block"
  
  # Prevent MIME-type sniffing
  Header set X-Content-Type-Options "nosniff"
  
  # Referrer policy
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Content Security Policy
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.pexels.com https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-src 'self'; object-src 'none'"
  
  # Cache control for static assets
  <FilesMatch "\\.(ico|pdf|jpg|jpeg|png|webp|gif|html|htm|xml|txt|xsl|css|js)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
</IfModule>

# Compress text files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Set correct MIME types
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
  AddType image/svg+xml .svg
  AddType application/json .json
</IfModule>
`;
};

/**
 * Check if the application is running on Hostinger
 */
export const isHostingerEnvironment = (): boolean => {
  return window.location.hostname.includes('techdevclub.com') || 
         window.location.hostname.includes('hostinger');
};

export default HOSTINGER_CONFIG;