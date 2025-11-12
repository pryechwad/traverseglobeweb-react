// Image optimization utility functions

/**
 * Optimizes image URLs for better performance
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return '';
  
  const {
    width = 400,
    quality = 40,
    format = 'webp'
  } = options;

  // For Unsplash images
  if (url.includes('unsplash.com')) {
    let optimizedUrl = url
      .replace(/w=\d+/, `w=${width}`)
      .replace(/q=\d+/, `q=${quality}`)
      .replace(/&w=\d+/, `&w=${width}`)
      .replace(/&q=\d+/, `&q=${quality}`);
    
    // Add WebP format if supported
    if (format === 'webp' && !optimizedUrl.includes('fm=')) {
      optimizedUrl += optimizedUrl.includes('?') ? '&fm=webp' : '?fm=webp';
    }
    
    return optimizedUrl;
  }
  
  // For Pexels images
  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}&fm=${format}`;
  }
  
  // For other images, return as is
  return url;
};

/**
 * Creates responsive image srcSet
 * @param {string} baseUrl - Base image URL
 * @param {Array} sizes - Array of width sizes
 * @returns {string} - srcSet string
 */
export const createResponsiveSrcSet = (baseUrl, sizes = [320, 400, 600, 800]) => {
  return sizes
    .map(size => `${optimizeImageUrl(baseUrl, { width: size, quality: 40 })} ${size}w`)
    .join(', ');
};

/**
 * Preloads critical images
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImageUrl(url, { width: 400, quality: 40 });
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 * @param {HTMLElement} element - Image element to observe
 * @param {Function} callback - Callback function when image is in view
 */
export const lazyLoadImage = (element, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '50px' }
  );
  
  observer.observe(element);
};

/**
 * Checks if WebP format is supported
 * @returns {boolean} - True if WebP is supported
 */
export const isWebPSupported = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Optimizes all images in siteData
 * @param {Object} siteData - Site data object containing image URLs
 * @returns {Object} - Optimized site data
 */
export const optimizeSiteDataImages = (siteData) => {
  const optimized = { ...siteData };
  
  // Optimize package images
  if (optimized.packages) {
    optimized.packages = optimized.packages.map(pkg => ({
      ...pkg,
      image: optimizeImageUrl(pkg.image, { width: 400, quality: 40 })
    }));
  }
  
  // Optimize banner images
  if (optimized.banners) {
    optimized.banners = optimized.banners.map(banner => 
      optimizeImageUrl(banner, { width: 800, quality: 50 })
    );
  }
  
  return optimized;
};