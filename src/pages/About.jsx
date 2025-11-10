const About = () => {
  return (
  <div className="min-h-screen pt-20 pb-10">
      {/* Hero */}
  <section className="py-8 md:py-10 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">About Traverse Globe</h1>
              <p className="text-base text-gray-700 mb-3">
                Founded with a passion for travel and a mission to simplify exploring the world, Traverse Globe offers
                customized tour packages across the globe — crafted to suit every traveler's dream and budget.
              </p>
              <p className="text-gray-700 mb-3">Let's make your next journey truly unforgettable.</p>
              <p className="font-semibold text-primary mb-5 text-base">Traverse Globe – Travel the world, the right way.</p>
              <a href="https://wa.me/919997085457" className="custom-btn inline-flex items-center gap-2 text-sm">
                <i className="fab fa-whatsapp"></i>
                Plan Your Journey
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                alt="Travel Experience"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
  <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fas fa-route', title: 'Personalized Itinerary', desc: "We don't just book your trip – we assist you personally from the moment you plan till you fly back home. Our dedicated team ensures you experience seamless travel, every step of the way." },
              { icon: 'fas fa-hotel', title: 'Luxury Stays, Unluxury Prices', desc: "Luxury stay without the luxury price tag. Whether you want it included or plan your own – we've got you covered, offering comfort and class that fit your budget." },
              { icon: 'fas fa-car', title: 'Ride Easy, Always Ready', desc: 'Enjoy hassle-free cab & rental car service in Dubai – no waiting, no confusion, just smooth travel wherever you go. We make sure your rides are as effortless as your vacation.' },
              { icon: 'fas fa-users', title: 'Trusted Local Expertise', desc: "We're backed by on-ground specialists who know each destination inside out, offering authentic experiences you won't find elsewhere." },
              { icon: 'fas fa-shield-alt', title: '100% In-House Service', desc: 'And the best part? We handle everything in-house! No third-party runarounds – just reliable, transparent, and well-coordinated service from start to finish.' },
            ].map((f, i) => (
              <div key={i} className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm feature-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent">
                <div className="feature-icon text-primary text-4xl mb-4">
                  <i className={f.icon}></i>
                </div>
                <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8" style={{ background: 'linear-gradient(135deg, #fefcf8 0%, #fdfbf6 50%, #fcfaf5 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-amber-900">Ready to Start Your Adventure?</h2>
          <p className="text-amber-800 mb-5">So, why wait? Message us today and let's plan your unforgettable Dubai experience.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/919997085457" className="px-5 py-2.5 rounded-full text-white text-sm" style={{ background: '#25D366' }}>
              <i className="fab fa-whatsapp mr-2"></i>Message Us on WhatsApp
            </a>
            <a href="tel:+919997085457" className="px-5 py-2.5 rounded-full border-2 text-sm" style={{ borderColor: '#8b4513', color: '#8b4513' }}>
              <i className="fas fa-phone mr-2"></i>Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
