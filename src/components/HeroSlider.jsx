import { useEffect, useRef, useState } from 'react';

export default function HeroSlider({ images = [], interval = 4000, className = '', children }){
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!images.length) return;
    timer.current = setInterval(() => {
      if (!hoverRef.current) {
        setIndex(i => (i + 1) % images.length);
      }
    }, interval);
    return () => clearInterval(timer.current);
  }, [images.length, interval]);

  const go = (dir) => {
    setIndex(i => {
      const n = images.length;
      return (i + (dir === 'next' ? 1 : -1) + n) % n;
    });
  };

  return (
    <div className={`relative w-full select-none ${className}`} onMouseEnter={() => (hoverRef.current = true)} onMouseLeave={() => (hoverRef.current = false)}>
      <div className="relative overflow-hidden rounded-none">
        <div className="w-full h-[260px] md:h-[480px] relative">
          {/* Slides */}
          <div className="absolute inset-0">
            <div className="h-full w-full flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
              {images.map((src, idx) => (
                <div key={idx} className="h-full w-full shrink-0 grow-0 basis-full relative">
                  <img src={src} alt={`slide-${idx}`} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Overlay content */}
          {children && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                {children}
              </div>
            </div>
          )}

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center" onClick={() => go('prev')}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center" onClick={() => go('next')}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button key={i} aria-label={`Go to slide ${i+1}`} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} onClick={() => setIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
