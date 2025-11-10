import { useMemo, useState } from 'react';
import { blogPosts as postsData } from '../data/siteData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const heroImages = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
  'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
];

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(postsData.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return postsData.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      if (!q) return matchesCat;
      const hay = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return matchesCat && hay.includes(q);
    });
  }, [query, category]);

  const featured = filtered[0] || postsData[0];
  const others = filtered.filter((p) => p.id !== featured.id);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Traverse Globe Travel Blog',
    url: typeof window !== 'undefined' ? window.location.href : 'https://example.com/blog',
  };

  const featuredJsonLd = featured
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: featured.title,
        datePublished: featured.date,
        author: { '@type': 'Person', name: featured.author },
        image: featured.image,
        articleSection: featured.category,
        url: featured.url || '#',
        timeRequired: `PT${featured.readTime}M`,
        description: featured.excerpt,
      }
    : null;

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      {featuredJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredJsonLd) }} />
      )}

      {/* Hero slider with overlay title and search */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full h-[260px] md:h-[420px] lg:h-[520px]"
        >
          {heroImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img src={src} alt={`Travel hero ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay heading + search */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 flex justify-center">
          <div className="w-11/12 max-w-3xl bg-white/95 backdrop-blur rounded-full shadow-xl flex overflow-hidden">
            <div className="px-5 py-3 text-darkBlue font-poppins whitespace-nowrap hidden md:block">Search</div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, destinations, tips..."
              className="flex-1 px-4 py-3 outline-none text-darkBlue/80"
            />
            <button className="bg-orange hover:bg-teal text-white px-5 md:px-7 transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                <path d="M20 20l-3.5-3.5" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition ${
                category === c ? 'bg-orange text-white border-orange' : 'bg-white text-darkBlue border-lightGray hover:border-orange/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <img src={featured.image} alt={featured.title} className="w-full h-64 md:h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-white/90 text-darkBlue text-xs font-semibold px-2 py-1 rounded-full">
                    {featured.category}
                  </span>
                  <h2 className="mt-2 text-white text-2xl md:text-3xl font-bold font-poppins drop-shadow-sm">
                    {featured.title}
                  </h2>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-lightGray p-6 flex flex-col">
                <div className="text-darkBlue/70 text-sm mb-2">
                  By {featured.author} • {new Date(featured.date).toLocaleDateString()} • {featured.readTime} min read
                </div>
                <p className="text-darkBlue/80 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-4">
                  <a href={featured.url || '#'} className="custom-btn px-5 py-2 text-sm inline-block !rounded-full">Read Article</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="gradient-text text-2xl md:text-3xl font-extrabold">Latest Articles</h2>
            <div className="text-darkBlue/80 text-sm">{filtered.length} result(s)</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((p) => (
              <article key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-lightGray overflow-hidden transition">
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-darkBlue/80">
                    <span className="inline-block bg-lightGray text-darkBlue px-2 py-0.5 rounded-full font-semibold">{p.category}</span>
                    <span>•</span>
                    <span>{new Date(p.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{p.readTime} min read</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-darkBlue font-poppins">{p.title}</h3>
                  <p className="mt-1 text-darkBlue/80 text-sm">{p.excerpt}</p>
                  <div className="mt-3">
                    <a href={p.url || '#'} className="text-teal hover:text-orange font-semibold">Read more →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
