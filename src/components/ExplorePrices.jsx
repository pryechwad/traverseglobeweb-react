import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { packages as sitePackages, packageDetails } from '../data/siteData';
import BookingModal from './BookingModal';
import { slugify } from '../utils/slug';

const PackageCard = ({ image, price, title, buttonLabel = 'Book Now', onClick }) => {
  const src480 = image.replace(/w=\d+/, 'w=480').replace(/q=\d+/, 'q=70');
  const src800 = image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=70');
  const src1200 = image.replace(/w=\d+/, 'w=1200').replace(/q=\d+/, 'q=70');
  return (
    <div className="custom-card bg-white">
      <div className="overflow-hidden">
        <img
          src={src800}
          srcSet={`${src480} 480w, ${src800} 800w, ${src1200} 1200w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-40 md:h-44 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="text-orange text-lg md:text-xl font-bold mb-1.5 font-poppins">
          ₹ {price.toLocaleString()}
        </div>
        <div className="text-darkBlue font-semibold text-sm md:text-base mb-2 text-center font-poppins">
          {title}
        </div>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fas fa-star text-orange text-xs mx-0.5 transition-transform hover:scale-125"></i>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClick}
            className="custom-btn px-3 py-1.5 text-xs"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const ExplorePrices = () => {
  const packages = sitePackages;
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  // const navigate = useNavigate();

  const resolveCategoryFromDetailId = (id) => {
    const num = Number(id);
    if ((num >= 1 && num <= 10)) return 'uae';
    if ((num >= 11 && num <= 15) || (num >= 26 && num <= 30)) return 'bali';
    if ((num >= 16 && num <= 20) || (num >= 36 && num <= 39)) return 'thailand';
    if ((num >= 21 && num <= 25) || (num >= 31 && num <= 35)) return 'singapore';
    return 'uae';
  };

  const handleCardClick = (pkg) => {
    // If a detailId is provided, open the package details page in a new tab with a name-based slug
    if (pkg.detailId) {
      const detail = packageDetails?.[pkg.detailId];
      const slug = slugify(detail?.name || pkg.title);
      const category = resolveCategoryFromDetailId(pkg.detailId);
      window.open(`/${category}-packages/${slug}`, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedTitle(pkg.title);
    setShowBooking(true);
  };

  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-darkBlue mb-2 font-poppins">
            Explore Prices
          </h2>
          <p className="text-sm text-darkBlue/80 font-canva-sans">Explore the hottest travel spots around the globe</p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={14}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="prizeSwiper py-4"
        >
          {packages.map((pkg, index) => (
            <SwiperSlide key={index}>
              <PackageCard
                image={pkg.image}
                price={pkg.price}
                title={pkg.title}
                buttonLabel={pkg.buttonLabel}
                onClick={() => handleCardClick(pkg)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <BookingModal
          open={showBooking}
          onClose={() => setShowBooking(false)}
          packageName={selectedTitle}
        />
      </div>
    </section>
  );
};

export default ExplorePrices;
