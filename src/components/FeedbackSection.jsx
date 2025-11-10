import { useMemo, useRef, useState } from 'react';
import { feedback as feedbackData } from '../data/siteData';

// Simple star icon component (no external icon deps)
const Star = ({ filled = false, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.468 2.468c.142.142.331.237.533.267l3.49.507a.75.75 0 0 1 .416 1.279l-2.524 2.46a1 1 0 0 0-.286.885l.596 3.474a.75.75 0 0 1-1.088.791l-3.12-1.64a1 1 0 0 0-.93 0l-3.12 1.64a.75.75 0 0 1-1.088-.79l.596-3.475a1 1 0 0 0-.286-.885L4.57 8.02a.75.75 0 0 1 .416-1.279l3.49-.507a1 1 0 0 0 .533-.267l2.468-2.468Z"
    />
  </svg>
);

const platformBadges = [
  { name: 'Google', color: 'bg-[#EA4335]', bg: 'bg-white', text: 'text-darkBlue', rating: 4.9, urlEnv: 'VITE_GOOGLE_REVIEWS_URL' },
  { name: 'Tripadvisor', color: 'bg-[#34E0A1]', bg: 'bg-white', text: 'text-darkBlue', rating: 4.8, urlEnv: 'VITE_TRIPADVISOR_REVIEWS_URL' },
  { name: 'Facebook', color: 'bg-[#1877F2]', bg: 'bg-white', text: 'text-darkBlue', rating: 4.9, urlEnv: 'VITE_FACEBOOK_REVIEWS_URL' },
];

const FeedbackSection = () => {
  const feedbacks = feedbackData;
  const countries = ['All', ...Object.keys(feedbacks)];
  const [filter, setFilter] = useState('All');
  const scrollerRef = useRef(null);

  // Flatten testimonials with country context
  const allTestimonials = useMemo(() => {
    const list = Object.entries(feedbacks).flatMap(([country, data]) =>
      data.testimonials.map((t, idx) => ({ ...t, country, key: `${country}-${idx}` }))
    );
    // Most recent feel first: keep original order, rating desc as secondary
    return list.sort((a, b) => b.rating - a.rating);
  }, [feedbacks]);

  const filteredTestimonials = useMemo(() => {
    if (filter === 'All') return allTestimonials;
    return allTestimonials.filter((t) => t.country === filter);
  }, [allTestimonials, filter]);

  const totalReviews = allTestimonials.length;
  const avgRating = useMemo(() => {
    if (!totalReviews) return 0;
    const sum = allTestimonials.reduce((acc, t) => acc + (t.rating || 0), 0);
    return sum / totalReviews;
  }, [allTestimonials, totalReviews]);

  const scrollBy = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const getEnv = (key) => import.meta?.env?.[key] || '#';
  const readReviewsUrl = getEnv('VITE_GOOGLE_REVIEWS_URL');
  const writeReviewUrl = getEnv('VITE_GOOGLE_WRITE_REVIEW_URL');

  // Structured data for SEO (aggregateRating)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Traverse Globe',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://example.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating ? avgRating.toFixed(1) : '0',
      reviewCount: totalReviews,
    },
  };

  return (
    <section className="section-padding bg-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-custom">
        {/* Heading + Rating Summary */}
  <div className="mb-5 md:mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-darkBlue mb-2 font-poppins">
            What travelers say about us
          </h2>
          <p className="text-sm text-darkBlue/80 font-canva-sans max-w-2xl mx-auto">
            Real stories from our customers around the world — curated, verified and showcased.
          </p>

          <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            {/* Aggregate rating */}
            <div className="flex items-center gap-2 rounded-full border border-lightGray bg-white px-3 py-1.5 shadow-sm">
              <div className="flex items-center text-orange">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} filled={i < Math.round(avgRating)} className="w-4 h-4" />
                ))}
              </div>
              <div className="text-left">
                <div className="text-xs font-poppins text-darkBlue">
                  {avgRating.toFixed(1)} out of 5
                </div>
                <div className="text-xs text-darkBlue/80 font-canva-sans">
                  Based on {totalReviews} reviews
                </div>
              </div>
            </div>

            {/* Platform badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {platformBadges.map((p) => (
                <a
                  key={p.name}
                  href={getEnv(p.urlEnv)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-lightGray bg-white px-2.5 py-1 hover:-translate-y-0.5 hover:shadow-md transition"
                >
                  <span className={`inline-block w-2 h-2 rounded-full ${p.color}`} />
                  <span className="text-xs font-poppins text-darkBlue">{p.name}</span>
                  <span className="text-xs text-darkBlue/80">{p.rating.toFixed(1)}★</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Filter chips */}
  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1 rounded-full text-xs font-poppins border transition shadow-sm ${
                filter === c
                  ? 'bg-orange text-white border-orange'
                  : 'bg-white text-darkBlue border-lightGray hover:border-orange/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            aria-label="Previous reviews"
            onClick={() => scrollBy(-1)}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-lightGray shadow hover:shadow-md items-center justify-center text-darkBlue"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory px-1 pb-2 scrollbar-thin"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredTestimonials.map((t) => (
              <article
                key={t.key}
                className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white border border-lightGray rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-orange">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} filled={i < t.rating} className="w-4 h-4" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-3 text-sm md:text-base text-darkBlue/80 leading-relaxed">
                    “{t.text}”
                  </p>

                  {/* Author */}
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/80?u=${encodeURIComponent(t.author)}`}
                      alt={t.author}
                      className="w-10 h-10 rounded-full border border-lightGray object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-sm font-semibold text-darkBlue font-poppins">{t.author}</div>
                      <div className="text-xs text-darkBlue/80">Visited {t.country}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            aria-label="Next reviews"
            onClick={() => scrollBy(1)}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-lightGray shadow hover:shadow-md items-center justify-center text-darkBlue"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* CTA row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-2.5">
          <a
            href={readReviewsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="custom-btn px-4 py-1.5 text-xs !rounded-full"
          >
            Read full reviews
          </a>
          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="px-4 py-1.5 text-xs rounded-full border border-teal text-teal hover:bg-teal hover:text-white transition font-poppins"
          >
            Write a review
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
