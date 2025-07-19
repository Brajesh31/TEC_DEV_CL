import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.resolve(__dirname, '../dist');
const htaccessPath = path.resolve(distDir, '.htaccess');

// Generate .htaccess file for SPA routing on Hostinger
const htaccessContent = `
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

// Create hostinger-deploy-checklist.txt
const checklistPath = path.resolve(distDir, 'hostinger-deploy-checklist.txt');
const checklistContent = `
TECH DEV CLUB - HOSTINGER DEPLOYMENT CHECKLIST
==============================================

1. UPLOAD FILES
   ✓ Upload all files from the 'dist' directory to your Hostinger public_html folder
   ✓ Make sure to include the .htaccess file (it might be hidden)

2. DOMAIN SETUP
   ✓ Configure your domain in Hostinger control panel
   ✓ Set up SSL certificate for HTTPS

3. DATABASE SETUP (If using database)
   ✓ Create MySQL database in Hostinger
   ✓ Import database schema
   ✓ Update connection strings in your configuration

4. ENVIRONMENT VARIABLES
   ✓ Set up any required environment variables in Hostinger

5. TESTING
   ✓ Test all routes and navigation
   ✓ Verify all API endpoints are working
   ✓ Check mobile responsiveness
   ✓ Test forms and user interactions

6. COMMON ISSUES
   ✓ If routes don't work, check that .htaccess is properly uploaded
   ✓ If images don't load, verify paths are correct
   ✓ If API calls fail, check CORS settings

For support, contact: techdevclub2025@gmail.com
`;

// Function to create file if it doesn't exist
function createFileWithContent(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error creating ${path.basename(filePath)}:`, error);
  }
}

// Main function
async function prepareForHostinger() {
  console.log('🚀 Preparing build for Hostinger deployment...');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  // Create .htaccess file
  createFileWithContent(htaccessPath, htaccessContent);
  
  // Create deployment checklist
  createFileWithContent(checklistPath, checklistContent);
  
  console.log('✅ Preparation complete! Your build is ready for Hostinger.');
  console.log('📂 Upload the contents of the "dist" folder to your Hostinger public_html directory.');
}

// Run the preparation
prepareForHostinger();