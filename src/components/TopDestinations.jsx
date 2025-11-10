import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { domesticDestinations } from '../data/siteData';

const TopDestinations = () => {
  const destinations = domesticDestinations;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-darkBlue font-poppins">
          Trending Destinations | Domestic
        </h2>
  <p className="text-sm text-darkBlue/80 mb-6 font-canva-sans">Explore the hottest travel spots around the country</p>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={14}
          autoplay={{
            delay: 3000,
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
          className="topDestinationSwiper"
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <Link to={destination.link} className="block">
                <div className="destination-box group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden h-48 md:h-56">
                    <img
                      src={destination.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=70')}
                      srcSet={`${destination.image.replace(/w=\d+/, 'w=480').replace(/q=\d+/, 'q=70')} 480w, ${destination.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=70')} 800w, ${destination.image.replace(/w=\d+/, 'w=1200').replace(/q=\d+/, 'q=70')} 1200w`}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                      alt={destination.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-darkBlue/40 group-hover:bg-teal/40 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-white">
                        <strong className="text-lg md:text-xl font-season drop-shadow-lg">{destination.title}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopDestinations;
