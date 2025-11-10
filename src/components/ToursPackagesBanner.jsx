const ToursPackagesBanner = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-orange/5 via-white to-amber-50">
      <div className="container-custom">
        <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-orange to-amber-500 p-1">
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-darkBlue font-poppins">
                🌍 Explore Amazing <span className="text-orange">Tours & Packages</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-canva-sans max-w-3xl mx-auto">
                Discover handcrafted tour packages designed to give you the best travel experiences across the globe
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-3">
                <div className="bg-orange/10 rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">✈️</span>
                  <span className="font-semibold text-darkBlue">International Tours</span>
                </div>
                <div className="bg-orange/10 rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">🏖️</span>
                  <span className="font-semibold text-darkBlue">Beach Holidays</span>
                </div>
                <div className="bg-orange/10 rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">🏔️</span>
                  <span className="font-semibold text-darkBlue">Adventure Trips</span>
                </div>
                <div className="bg-orange/10 rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">💑</span>
                  <span className="font-semibold text-darkBlue">Honeymoon Specials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToursPackagesBanner;

