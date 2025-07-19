/**
 * Utility functions for SEO optimization
 */

/**
 * Update page metadata for SEO
 * @param title Page title
 * @param description Page description
 * @param keywords Keywords for the page
 * @param imageUrl Open Graph image URL
 * @param path Current path (without domain)
 */
export const updatePageMetadata = (
  title: string,
  description: string,
  keywords: string = '',
  imageUrl: string = '/og-image.jpg',
  path: string = '/'
): void => {
  // Base URL for canonical and OG URLs
  const baseUrl = 'https://techdevclub.com';
  const fullUrl = `${baseUrl}${path}`;
  
  // Update document title
  document.title = `${title} | Tech Dev Club`;
  
  // Find or create meta tags
  const metaTags = {
    description: getOrCreateMetaTag('description'),
    keywords: getOrCreateMetaTag('keywords'),
    ogTitle: getOrCreateMetaTag('og:title', 'property'),
    ogDescription: getOrCreateMetaTag('og:description', 'property'),
    ogUrl: getOrCreateMetaTag('og:url', 'property'),
    ogImage: getOrCreateMetaTag('og:image', 'property'),
    twitterTitle: getOrCreateMetaTag('twitter:title', 'name'),
    twitterDescription: getOrCreateMetaTag('twitter:description', 'name'),
    twitterImage: getOrCreateMetaTag('twitter:image', 'name'),
    canonical: getOrCreateLinkTag('canonical', 'rel')
  };
  
  // Update meta tag content
  metaTags.description.content = description;
  metaTags.keywords.content = keywords;
  metaTags.ogTitle.content = title;
  metaTags.ogDescription.content = description;
  metaTags.ogUrl.content = fullUrl;
  metaTags.ogImage.content = `${baseUrl}${imageUrl}`;
  metaTags.twitterTitle.content = title;
  metaTags.twitterDescription.content = description;
  metaTags.twitterImage.content = `${baseUrl}${imageUrl}`;
  metaTags.canonical.href = fullUrl;
};

/**
 * Get or create a meta tag
 * @param name Name or property of the meta tag
 * @param attributeName 'name' or 'property'
 * @returns The meta element
 */
const getOrCreateMetaTag = (name: string, attributeName: 'name' | 'property' = 'name'): HTMLMetaElement => {
  // Try to find existing tag
  let tag = document.querySelector(`meta[${attributeName}="${name}"]`) as HTMLMetaElement;
  
  // Create if it doesn't exist
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, name);
    document.head.appendChild(tag);
  }
  
  return tag;
};

/**
 * Get or create a link tag
 * @param rel Rel attribute value
 * @param attributeName Usually 'rel'
 * @returns The link element
 */
const getOrCreateLinkTag = (rel: string, attributeName: 'rel' = 'rel'): HTMLLinkElement => {
  // Try to find existing tag
  let tag = document.querySelector(`link[${attributeName}="${rel}"]`) as HTMLLinkElement;
  
  // Create if it doesn't exist
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute(attributeName, rel);
    document.head.appendChild(tag);
  }
  
  return tag;
};

/**
 * Generate structured data for a page
 * @param type Schema.org type
 * @param data Data for the structured data
 * @returns JSON-LD script element
 */
export const generateStructuredData = (type: string, data: any): HTMLScriptElement => {
  // Create the script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  
  // Create the structured data object
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
  
  // Set the script content
  script.textContent = JSON.stringify(structuredData);
  
  return script;
};

/**
 * Add structured data to the page
 * @param type Schema.org type
 * @param data Data for the structured data
 */
export const addStructuredData = (type: string, data: any): void => {
  // Remove any existing structured data with the same type
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => {
    try {
      const scriptData = JSON.parse(script.textContent || '{}');
      if (scriptData['@type'] === type) {
        script.remove();
      }
    } catch (e) {
      // Ignore parsing errors
    }
  });
  
  // Add the new structured data
  const script = generateStructuredData(type, data);
  document.head.appendChild(script);
};

/**
 * Generate SEO-friendly page title
 * @param title Base title
 * @param suffix Suffix to append (usually site name)
 * @returns Formatted title
 */
export const formatPageTitle = (title: string, suffix: string = 'Tech Dev Club'): string => {
  return `${title} | ${suffix}`;
};

/**
 * Generate SEO-friendly URL slug
 * @param text Text to convert to slug
 * @returns URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export default {
  updatePageMetadata,
  addStructuredData,
  formatPageTitle,
  generateSlug
};