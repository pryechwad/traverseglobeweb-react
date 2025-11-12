import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 400, 
  quality = 40,
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Optimize image URL
  const optimizeImageUrl = (url) => {
    if (!url) return '';
    
    // For Unsplash images
    if (url.includes('unsplash.com')) {
      return url
        .replace(/w=\d+/, `w=${width}`)
        .replace(/q=\d+/, `q=${quality}`)
        .replace(/&w=\d+/, `&w=${width}`)
        .replace(/&q=\d+/, `&q=${quality}`);
    }
    
    // For Pexels images
    if (url.includes('pexels.com')) {
      return `${url}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
    }
    
    return url;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const optimizedSrc = optimizeImageUrl(src);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;