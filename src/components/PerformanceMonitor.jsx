import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor page load performance
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          const totalLoadTime = navigation.loadEventEnd - navigation.fetchStart;
          
          console.log('🚀 Performance Metrics:', {
            'Total Load Time': `${totalLoadTime.toFixed(2)}ms`,
            'DOM Content Loaded': `${domContentLoaded.toFixed(2)}ms`,
            'Page Load Event': `${loadTime.toFixed(2)}ms`,
          });
          
          // Performance feedback
          if (totalLoadTime > 3000) {
            console.warn('⚠️ Page loading slowly. Images optimized but consider further optimization.');
          } else if (totalLoadTime > 1500) {
            console.log('⚡ Page loading is decent. Image optimization is working!');
          } else {
            console.log('✅ Excellent loading performance! Optimization successful!');
          }
        }
      }
    };

    // Monitor image loading
    const monitorImageLoading = () => {
      setTimeout(() => {
        const images = document.querySelectorAll('img');
        const totalImages = images.length;
        let loadedImages = 0;
        let failedImages = 0;
        
        if (totalImages === 0) {
          console.log('📸 No images found on page');
          return;
        }
        
        images.forEach(img => {
          if (img.complete && img.naturalWidth > 0) {
            loadedImages++;
          } else if (img.complete && img.naturalWidth === 0) {
            failedImages++;
          }
        });
        
        console.log(`📸 Image Status: ${loadedImages}/${totalImages} loaded, ${failedImages} failed`);
        
        if (loadedImages === totalImages) {
          console.log('✅ All images loaded successfully!');
        } else if (failedImages > 0) {
          console.warn(`⚠️ ${failedImages} images failed to load`);
        }
      }, 2000); // Check after 2 seconds
    };

    // Run performance monitoring after page load
    if (document.readyState === 'complete') {
      measurePerformance();
      monitorImageLoading();
    } else {
      window.addEventListener('load', () => {
        measurePerformance();
        monitorImageLoading();
      });
    }

    // Monitor additional performance metrics
    const monitorAdditionalMetrics = () => {
      if ('PerformanceObserver' in window) {
        try {
          // Monitor paint events
          const paintObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              console.log(`🎨 ${entry.name}:`, `${entry.startTime.toFixed(2)}ms`);
            });
          });
          paintObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          // Performance Observer not supported
        }
      }
    };
    
    monitorAdditionalMetrics();

  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;