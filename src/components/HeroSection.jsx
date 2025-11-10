import { banners } from '../data/siteData';
import HeroSlider from './HeroSlider';

const HeroSection = () => {
  return (
    <section className="relative mt-16 md:mt-20">
      <HeroSlider 
        images={banners} 
        className="w-full h-[280px] md:h-[420px] lg:h-[520px]"
      >
        {/* Search Overlay */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-3xl">
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-2xl border border-lightGray">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-center mb-4 text-darkBlue">
              Holiday Packages
            </h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0">
              <input
                type="text"
                placeholder="Enter Your Dream Destination!"
                className="flex-1 px-4 py-2.5 md:rounded-l-full rounded-full md:rounded-r-none border-2 border-lightGray focus:outline-none focus:border-orange text-darkBlue text-sm font-canva-sans placeholder:text-darkBlue/50"
              />
              <button className="bg-orange hover:bg-teal text-white px-5 py-2.5 text-sm md:rounded-r-full rounded-full md:rounded-l-none transition-all font-poppins font-semibold shadow-lg hover:shadow-xl">
                <i className="fas fa-search mr-2"></i>
                Search
              </button>
            </div>
          </div>
        </div>
      </HeroSlider>
    </section>
  );
};

export default HeroSection;
