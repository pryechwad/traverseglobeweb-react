import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { services } from '../data/siteData';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center border border-lightGray">
      <div className="text-3xl text-orange mb-3 transition-all duration-300 hover:scale-110 inline-block">
        <i className={icon}></i>
      </div>
      <h4 className="text-base font-bold mb-2 text-darkBlue font-poppins">{title}</h4>
      <p className="text-darkBlue/70 leading-relaxed font-canva-sans text-xs md:text-sm">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  // services imported from siteData

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Title and Description */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-darkBlue mb-4 font-poppins">
              Why Choose Traverse Globe?
            </h2>
            <p className="text-darkBlue/80 leading-relaxed text-sm md:text-base font-canva-sans mb-4">
              At Traverse Globe, we specialize exclusively in Dubai, offering you a journey through
              its most unique and unexplored destinations. Our deep focus on this vibrant city allows
              us to craft unparalleled experiences that go beyond the ordinary.
            </p>
            <p className="text-darkBlue/80 leading-relaxed text-sm md:text-base font-canva-sans">
              Discover hidden gems, enjoy exclusive access, and immerse yourself in Dubai like never before. 
              Choose Traverse Globe for a travel adventure that's as unique as the city itself!
            </p>
          </div>

          {/* Right Column - Services Slider */}
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="serviceSlider"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
