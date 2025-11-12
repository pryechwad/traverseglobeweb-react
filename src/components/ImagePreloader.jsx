import { useEffect } from 'react';

const ImagePreloader = ({ images = [], priority = false }) => {
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = () => {
      images.forEach((src, index) => {
        if (priority && index < 3) {
          // Preload first 3 images immediately
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        } else {
          // Lazy preload other images
          setTimeout(() => {
            const img = new Image();
            img.src = src;
          }, index * 100);
        }
      });
    };

    // Start preloading after a short delay
    const timer = setTimeout(preloadImages, priority ? 0 : 500);
    
    return () => clearTimeout(timer);
  }, [images, priority]);

  return null;
};

export default ImagePreloader;