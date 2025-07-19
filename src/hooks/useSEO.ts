import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageMetadata, addStructuredData } from '../utils/seoUtils';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  structuredData?: {
    type: string;
    data: any;
  };
}

/**
 * Hook to update page metadata for SEO
 * @param props SEO properties
 */
export const useSEO = (props: SEOProps): void => {
  const location = useLocation();
  
  useEffect(() => {
    // Update page metadata
    updatePageMetadata(
      props.title,
      props.description,
      props.keywords || '',
      props.imageUrl || '/og-image.jpg',
      location.pathname
    );
    
    // Add structured data if provided
    if (props.structuredData) {
      addStructuredData(props.structuredData.type, props.structuredData.data);
    }
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname, props]);
};

export default useSEO;