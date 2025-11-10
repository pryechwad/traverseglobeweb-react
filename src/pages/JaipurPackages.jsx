import { useMemo, useState } from 'react';
import { jaipurPackages, jaipurBanners } from '../data/siteData';
import PackageCard from '../components/PackageCard';
import HeroSlider from '../components/HeroSlider';

const JaipurPackages = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return jaipurPackages;
    return jaipurPackages.filter(p => p.title.toLowerCase().includes(q));
  }, [searchTerm]);

  return (
    <div className="min-h-screen pt-20 pb-10">
      <section className="relative">
        <HeroSlider 
          images={jaipurBanners} 
          className="w-full h-[280px] md:h-[420px] lg:h-[520px]"
        >
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-3xl">
            <div className="bg-white rounded-2xl p-4 md:p-5 shadow-2xl border border-lightGray">
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-darkBlue">Jaipur Holidays Packages</h1>
                <p className="text-darkBlue/70 mt-2 font-canva-sans">Explore the Pink City's royal heritage and palaces</p>
              </div>
              <form
                className="flex flex-col md:flex-row gap-2 md:gap-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchTerm(query);
                }}
              >
                <input
                  className="flex-1 px-4 py-2.5 md:rounded-l-full rounded-full md:rounded-r-none border-2 border-lightGray focus:outline-none focus:border-orange text-darkBlue text-sm font-canva-sans placeholder:text-darkBlue/50"
                  placeholder="Search Jaipur packages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="bg-orange hover:bg-teal text-white px-5 py-2.5 text-sm md:rounded-r-full rounded-full md:rounded-l-none transition-all font-poppins font-semibold shadow-lg hover:shadow-xl">
                  <i className="fas fa-search mr-2"></i>
                  Search
                </button>
              </form>
              {searchTerm && (
                <p className="text-darkBlue/60 text-sm mt-2 text-center">Showing results for: <span className="font-semibold">{searchTerm}</span></p>
              )}
            </div>
          </div>
        </HeroSlider>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} category="jaipur" />
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4">No packages found.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JaipurPackages;