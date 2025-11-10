export default function Contact() {
  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Top banner */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-800">
            <div className="text-sm uppercase tracking-wider text-primary font-semibold">Contact Us</div>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2">What Are You <span className="text-accent">Waiting For</span></h1>
            <p className="mt-3 text-gray-600">Reach out to us anytime, from anywhere - we're always here to help and look forward to assisting you.</p>
          </div>
        </div>
      </section>

      {/* India Offices */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Offices Within <em>India</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delhi */}
            <div className="bg-white rounded-2xl shadow p-6 flex gap-4 items-start">
              <img src="https://images.emtcontent.com/contact/delhi.svg" alt="Delhi" className="w-16 h-16" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">Delhi</div>
                </div>
                <address className="not-italic text-gray-700 mt-1">
                  129, First Floor, Antriksh Bhawan, New Delhi, Delhi, 110001
                </address>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <div><a href="mailto:mail@traverseglobe.com" className="text-primary hover:underline">Email us: mail@traverseglobe.com</a></div>
                  <div>Call us: <a href="tel:+919997085457" className="hover:underline">+91 9997085457</a></div>
                  <div className="flex items-center gap-2">WhatsApp: <img className="w-4 h-4" src="https://images.emtcontent.com/contact/whatsapp-lp.png" alt="whatsapp" /> <a className="text-green-600 hover:underline" href="https://wa.me/9997085457?text=EMT">+91 99970 85457</a></div>
                </div>
              </div>
            </div>

            {/* Noida */}
            <div className="bg-white rounded-2xl shadow p-6 flex gap-4 items-start">
              <img src="https://images.emtcontent.com/contact/noida.svg" alt="Noida" className="w-16 h-16" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">Noida</div>
                </div>
                <address className="not-italic text-gray-700 mt-1">
                  H - 173, Sector -63 Noida Uttar Pradesh, Near Noida Electronic City metro station - 201301
                </address>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <div><a href="mailto:mail@traverseglobe.com" className="text-primary hover:underline">Email us: mail@traverseglobe.com</a></div>
                  <div className="flex items-center gap-2">WhatsApp: <img className="w-4 h-4" src="https://images.emtcontent.com/contact/whatsapp-lp.png" alt="whatsapp" /> <a className="text-green-600 hover:underline" href="https://wa.me/9520232324?text=EMT">+91 9520232324</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overseas Offices */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Overseas <em>Offices</em></h2>
          <div className="bg-white rounded-2xl shadow p-6 flex gap-4 items-start">
            <img src="https://images.emtcontent.com/contact/dubai.svg" alt="Dubai" className="w-16 h-16" />
            <div>
              <div className="text-xl font-bold">Dubai</div>
              <address className="not-italic text-gray-700 mt-2 space-y-3">
                <div>
                  <strong>Corporate Office:</strong><br />
                  Traverse Globe Middleeast DMCC<br />
                  1103 , Fortune tower Cluster C, JLT, Dubai, UAE
                </div>
                <div className="text-sm">
                  <a href="mailto:mail@traverseglobe.com" className="text-primary hover:underline">Email: mail@traverseglobe.com</a><br />
                  <a href="https://traverseglobe.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Website : www.traverseglobe.com</a>
                </div>
                <hr />
                <div>
                  <strong>Retail Office:</strong><br />
                  Traverse Globe Tours LLC<br />
                  2113, Al manara Tower, Business Bay Dubai - UAE
                </div>
                <div className="text-sm">
                  <a href="mailto:mail@traverseglobe.com" className="text-primary hover:underline">Email: mail@traverseglobe.com</a><br />
                  <a href="https://traverseglobe.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Website : www.traverseglobe.com/</a><br />
                  <a href="tel:043035888" className="hover:underline">Call Us : 043035888</a>
                </div>
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Where to Find <em>Us?</em></h2>
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m19!1m12!1m3!1d112064.24598374275!2d77.14238317835341!3d28.629531712393085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m4!3e6!4m0!4m1!2sANTRIKSH%20BHAWAN%2C%20Metro%20Station%2C%2022%2C%20KG%20Marg%2C%20near%20Barakhamba%20Road%2C%20Barakhamba%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1732724528999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TraverseGlobe Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Connect With Us */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Connect With <em>Us At</em></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Holidays Enquiry', email: 'holidays@traverseglobe.com', img: 'https://images.emtcontent.com/contact/holidays.svg' },
              { title: 'Partnership', email: 'marketing@traverseglobe.com', img: 'https://images.emtcontent.com/contact/partnership.svg' },
              { title: 'Booking Status', email: 'care@traverseglobe.com', img: 'https://images.emtcontent.com/contact/booking-status.svg' },
              { title: 'Event Sponsorships', email: 'sponsorship@traverseglobe.com', img: 'https://images.emtcontent.com/contact/event-sportship.svg' },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl p-6 shadow bg-${i % 2 === 0 ? 'white' : 'gray-50'}`}>
                <img src={c.img} alt={c.title} className="w-14 h-14" />
                <div className="mt-3 text-lg font-semibold">{c.title}</div>
                <a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
