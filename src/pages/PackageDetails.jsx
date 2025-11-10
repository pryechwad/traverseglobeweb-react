import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { packageDetails, uaePackages, baliPackages, thailandPackages, singaporePackages, srilankaPackages, vietnamPackages, laosPackages, andamanPackages, jaipurPackages, keralaPackages, kashmirPackages } from '../data/siteData';
import { slugify } from '../utils/slug';
import PackageCard from '../components/PackageCard';

export default function PackageDetails() {
  const { slug } = useParams();

  // Resolve detail either by numeric id or slug of name
  let resolvedId = Number.isFinite(Number(slug)) ? Number(slug) : null;
  let detail = resolvedId ? packageDetails[resolvedId] : null;

  if (!detail && typeof slug === 'string') {
    // find by slug of detail.name
    const matchEntry = Object.entries(packageDetails).find(([, d]) => slugify(d?.name) === slug);
    if (matchEntry) {
      resolvedId = Number(matchEntry[0]);
      detail = matchEntry[1];
    }
  }
  const pkgId = resolvedId ?? -1;
  const listMeta = useMemo(() => {
    const all = [
      ...uaePackages.map(p => ({...p, _cat: 'uae'})),
      ...baliPackages.map(p => ({...p, _cat: 'bali'})),
      ...thailandPackages.map(p => ({...p, _cat: 'thailand'})),
      ...singaporePackages.map(p => ({...p, _cat: 'singapore'})),
      ...srilankaPackages.map(p => ({...p, _cat: 'srilanka'})),
      ...vietnamPackages.map(p => ({...p, _cat: 'vietnam'})),
      ...laosPackages.map(p => ({...p, _cat: 'laos'})),
      ...andamanPackages.map(p => ({...p, _cat: 'andaman'})),
      ...jaipurPackages.map(p => ({...p, _cat: 'jaipur'})),
      ...keralaPackages.map(p => ({...p, _cat: 'kerala'})),
      ...kashmirPackages.map(p => ({...p, _cat: 'kashmir'})),
    ];
    return all.find(p => p.id === pkgId);
  }, [pkgId]);

  // Get similar packages based on category
  const similarPackages = useMemo(() => {
    if (!listMeta) return [];
    
    let categoryPackages = [];
    if (listMeta._cat === 'uae') {
      categoryPackages = uaePackages;
    } else if (listMeta._cat === 'bali') {
      categoryPackages = baliPackages;
    } else if (listMeta._cat === 'thailand') {
      categoryPackages = thailandPackages;
    } else if (listMeta._cat === 'singapore') {
      categoryPackages = singaporePackages;
    } else if (listMeta._cat === 'srilanka') {
      categoryPackages = srilankaPackages;
    } else if (listMeta._cat === 'vietnam') {
      categoryPackages = vietnamPackages;
    } else if (listMeta._cat === 'laos') {
      categoryPackages = laosPackages;
    } else if (listMeta._cat === 'andaman') {
      categoryPackages = andamanPackages;
    } else if (listMeta._cat === 'jaipur') {
      categoryPackages = jaipurPackages;
    } else if (listMeta._cat === 'kerala') {
      categoryPackages = keralaPackages;
    } else if (listMeta._cat === 'kashmir') {
      categoryPackages = kashmirPackages;
    }
    
    // Filter out current package and limit to 3 packages
    return categoryPackages.filter(p => p.id !== pkgId).slice(0, 3);
  }, [listMeta, pkgId]);

  const images = detail?.images || [];
  const [active, setActive] = useState(images[0] || '');
  const [activeSection, setActiveSection] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const destination = detail?.destination || '—';

  useEffect(() => {
    setActive(images[0] || '');
  }, [pkgId]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'itinerary', 'inclusions', 'hotels'];
      const scrollPosition = window.scrollY + 200;

      // Show back to top button
      setShowBackToTop(window.scrollY > 300);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const onImgError = (e) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x450/DAA520/FFFFFF?text=Package+Image';
  };

  const onThumbError = (e, idx) => {
    e.currentTarget.src = `https://via.placeholder.com/200x100/DAA520/FFFFFF?text=Image+${idx+1}`;
  };

  const subtitle = (
    <span>
      <i className="fas fa-map-marker-alt" /> {destination}
      {' '}
      {listMeta?.nights ? (<span>| <i className="fas fa-calendar" /> {listMeta.nights}</span>) : (<span>| <i className="fas fa-calendar" /> Multi-Day</span>)}
      {' '}| <i className="fas fa-star text-yellow-400" /> 4.8 (256 Reviews)
    </span>
  );

  const overviewList = getOverviewList(pkgId, detail?.name);
  const itinerary = getItinerary(pkgId, destination);

  if (!detail) {
    return (
      <div className="min-h-screen pt-20 pb-10 container mx-auto px-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-2xl">Package not found. <Link to="/uae-packages" className="text-primary underline">Go back to packages</Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{detail.name}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left: gallery + tabs */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow p-4 mb-4">
              {active && (
                <img src={active} onError={onImgError} alt="Main" className="w-full h-80 md:h-[450px] object-cover rounded-xl" />
              )}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.map((src, idx) => (
                  <button key={idx} className={`rounded-lg overflow-hidden border ${active===src ? 'border-primary' : 'border-transparent'}`} onClick={() => setActive(src)}>
                    <img src={src} onError={(e)=>onThumbError(e, idx)} alt={`thumb-${idx}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-4 sticky top-20 z-10">
              <div className="flex gap-2 px-2 md:px-4 py-3 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: 'fa-info-circle' },
                  { id: 'itinerary', label: 'Itinerary', icon: 'fa-calendar-alt' },
                  { id: 'inclusions', label: 'Inclusions', icon: 'fa-check-circle' },
                  { id: 'hotels', label: 'Hotels', icon: 'fa-hotel' }
                ].map(({ id, label, icon }) => (
                  <button 
                    key={id} 
                    onClick={() => scrollToSection(id)} 
                    className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      activeSection === id 
                        ? 'bg-gradient-to-r from-[#075056] to-[#0a6b72] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-[#E4EEF0] hover:text-[#16232A]'
                    }`}
                  >
                    <i className={`fas ${icon} mr-2`}></i>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* All Sections - Scrollable Content */}
            <div className="space-y-4">
              {/* Overview Section */}
              <div id="overview" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-info-circle text-[#FF5B04]"></i>
                  Overview
                </h3>
                <div className="text-gray-700 space-y-3">
                  <p>Discover the allure of {destination.split(',')[0]} with our exclusive tour package! Explore iconic landmarks, enjoy thrilling adventures and world-class shopping. With comfortable stays, guided tours, and seamless transfers, experience the perfect blend of adventure, luxury, and culture.</p>
                  <div className="bg-gradient-to-br from-[#d4f1f4] via-[#E4EEF0] to-[#cfe9ec] rounded-lg p-6 shadow-md border-l-4 border-[#075056]">
                    <h6 className="text-[#16232A] font-bold mb-3 flex items-center gap-2 text-lg">
                      <i className="fas fa-star text-[#FF5B04]"/> {detail.name}
                    </h6>
                    <ul className="list-disc pl-5 space-y-2 text-[#16232A]">
                      {overviewList.map((li,i)=>(<li key={i}>{li}</li>))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Itinerary Section */}
              <div id="itinerary" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-[#FF5B04]"></i>
                  Day-wise Itinerary
                </h3>
                <div className="space-y-4">
                  {itinerary.map((day, idx)=> (
                    <div key={idx} className="bg-gradient-to-r from-[#E4EEF0] via-[#f5fafb] to-[#E4EEF0] p-5 rounded-xl border-l-4 border-[#FF5B04] shadow-md hover:shadow-lg transition-all duration-300">
                      <h5 className="text-[#16232A] font-bold text-lg flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-[#FF5B04] text-white rounded-full text-sm font-bold shadow-md">{idx + 1}</span>
                        {day.title}
                      </h5>
                      <div className="text-gray-700 mt-3 space-y-2 ml-10">
                        {day.paragraphs.map((p, i)=>(<p key={i}>{p}</p>))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions Section */}
              <div id="inclusions" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-check-circle text-[#FF5B04]"></i>
                  Inclusions & Exclusions
                </h3>
                <div className="text-gray-700">
                  <div className="bg-gradient-to-br from-[#d4f1f4] to-[#E4EEF0] rounded-xl p-5 mb-4 shadow-md border-l-4 border-[#075056]">
                    <h5 className="text-[#075056] font-bold mb-4 text-lg flex items-center gap-2">
                      <i className="fas fa-check-circle text-[#075056]"/>What's Included
                    </h5>
                    <ul className="space-y-3">
                      {getInclusions(pkgId).map((item,i)=>(
                        <li key={i} className="flex items-start gap-3 text-[#16232A]">
                          <i className="fas fa-check-circle text-[#075056] mt-1 flex-shrink-0"/> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-xl p-5 shadow-md border-l-4 border-red-400">
                    <h5 className="text-red-600 font-bold mb-4 text-lg flex items-center gap-2">
                      <i className="fas fa-times-circle"/>What's Not Included
                    </h5>
                    <ul className="space-y-3">
                      {getExclusions().map((item,i)=>(
                        <li key={i} className="flex items-start gap-3 text-red-800">
                          <i className="fas fa-times-circle text-red-600 mt-1 flex-shrink-0"/> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hotels Section */}
              <div id="hotels" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-hotel text-[#FF5B04]"></i>
                  Accommodation Details
                </h3>
                <div className="text-gray-700">
                  <p className="mb-4 font-semibold text-lg text-[#16232A]">{destination.split(',')[0]} Hotel Options:</p>
                  <ul className="space-y-3">
                    {getHotels(pkgId, destination).map((h,i)=>(
                      <li key={i} className="flex items-start gap-3 bg-gradient-to-r from-[#E4EEF0] via-[#f5fafb] to-[#E4EEF0] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#075056]">
                        <i className="fas fa-building text-[#075056] mt-1 flex-shrink-0 text-xl"/> 
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 bg-gradient-to-r from-[#fff3e0] to-[#ffe0b2] p-4 rounded-xl shadow-md border-l-4 border-[#FF5B04]">
                    <p className="text-sm text-[#16232A] font-medium">
                      <i className="fas fa-info-circle mr-2 text-[#FF5B04]"></i>
                      *Hotel subject to availability at the time of booking. Similar category hotel will be provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-5 lg:sticky lg:top-24">
              <div className="text-center rounded-xl p-6 bg-gradient-to-br from-[#E4EEF0] via-[#d4f1f4] to-[#bde5e8] shadow-lg border-2 border-[#075056]/10">
                <div className="text-xs text-[#075056] font-semibold mb-2 uppercase tracking-widest">Starting from</div>
                {listMeta ? (
                  <div>
                    {typeof listMeta.strikePrice === 'number' && (
                      <div className="text-lg text-red-400 line-through mb-1">₹{listMeta.strikePrice.toLocaleString('en-IN')}</div>
                    )}
                    <div className="text-5xl font-extrabold text-[#075056] mb-1 drop-shadow-md">₹{listMeta.price?.toLocaleString ? listMeta.price.toLocaleString('en-IN') : listMeta.price}</div>
                  </div>
                ) : (
                  <div className="text-5xl font-extrabold text-[#075056] mb-1 drop-shadow-md" dangerouslySetInnerHTML={{ __html: detail.priceHTML }} />
                )}
                <div className="text-xs text-[#075056]/80 font-semibold mt-2">Per Person on twin sharing</div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-700 block">Travel Date</label>
                <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700 block">Adult (12+)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={()=> setAdult(a=> Math.max(1, a-1))}>-</button>
                    <input readOnly value={adult} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={()=> setAdult(a=> a+1)}>+</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 block">Child (&lt;12)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={()=> setChild(c=> Math.max(0, c-1))}>-</button>
                    <input readOnly value={child} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={()=> setChild(c=> c+1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a href="tel:+919997085457" className="flex-1 bg-orange text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal text-center whitespace-nowrap"><i className="fas fa-phone mr-1 sm:mr-2"/>Call</a>
                <button onClick={()=>openWhatsApp(detail)} className="flex-1 text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center whitespace-nowrap" style={{background:'#25D366'}}><i className="fab fa-whatsapp mr-1 sm:mr-2"/>WhatsApp</button>
              </div>

              <button className="mt-3 w-full custom-btn" onClick={()=>setShowModal(true)}>Book Now</button>

              <div className="mt-5 pt-4 border-t text-sm text-gray-600 space-y-2">
                <div><i className="fas fa-phone text-primary mr-2"/> +91 99970 85457</div>
                <div><i className="fas fa-envelope text-primary mr-2"/> mail@traverseglobe.com</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-4" onClick={()=>setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <div className="px-5 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white flex items-center justify-between">
              <h5 className="font-semibold">Want to Go For A Memorable Holiday?</h5>
              <button onClick={()=>setShowModal(false)} className="text-white text-xl">×</button>
            </div>
            <div className="p-5">
              <form onSubmit={(e)=>handleBookingSubmit(e, detail, {adult, child, infant}, ()=>setShowModal(false))} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Package Name</label>
                  <input readOnly value={detail.name} className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50" />
                </div>
                <h6 className="font-bold">Personal Details</h6>
                <div>
                  <label className="text-sm">Name</label>
                  <input required placeholder="Your Name" className="mt-1 w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm">Mobile No.</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <span className="px-3 py-2 bg-gray-50 border-r">+91</span>
                    <input required pattern="[0-9]{10}" placeholder="Mobile No." className="flex-1 px-3 py-2 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm">Email ID</label>
                  <input required type="email" placeholder="Your E-mail Address" className="mt-1 w-full border rounded-lg px-3 py-2" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm">Adult</label>
                    <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                      <button type="button" className="px-3 py-2" onClick={()=> setAdult(a=> Math.max(1, a-1))}>-</button>
                      <input readOnly value={adult} className="w-full text-center border-l border-r" />
                      <button type="button" className="px-3 py-2" onClick={()=> setAdult(a=> a+1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Child</label>
                    <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                      <button type="button" className="px-3 py-2" onClick={()=> setChild(c=> Math.max(0, c-1))}>-</button>
                      <input readOnly value={child} className="w-full text-center border-l border-r" />
                      <button type="button" className="px-3 py-2" onClick={()=> setChild(c=> c+1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Infant</label>
                    <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                      <button type="button" className="px-3 py-2" onClick={()=> setInfant(i=> Math.max(0, i-1))}>-</button>
                      <input readOnly value={infant} className="w-full text-center border-l border-r" />
                      <button type="button" className="px-3 py-2" onClick={()=> setInfant(i=> i+1)}>+</button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full custom-btn">Submit Booking</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Similar Packages Section */}
      {similarPackages.length > 0 && (
  <div className="container mx-auto px-4 mt-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-darkBlue font-poppins mb-2">
              Similar Packages You May Like
            </h2>
            <p className="text-gray-600 font-canva-sans">
              Explore more amazing {listMeta?._cat?.toUpperCase() || 'destinations'} packages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} category={listMeta?._cat} />
            ))}
          </div>
          
          {/* View All Link */}
          <div className="text-center mt-8">
            <Link 
              to={`/${listMeta?._cat}-packages`}
              className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-poppins font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal"
            >
              View All {listMeta?._cat?.toUpperCase() || 'Tour'} Packages
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

function openWhatsApp(detail){
  const message = `Hi, I want to know more about *${detail.name}* package (${detail.priceHTML.replace(/<[^>]+>/g,'')})`;
  const phone = '919997085457';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleBookingSubmit(e, detail, counts, close){
  e.preventDefault();
  alert('Booking submitted successfully! We will contact you soon.');
  close();
}

function getOverviewList(id, name){
  const idNum = Number(id);
  
  // Laos specific overview
  if (idNum >= 70 && idNum <= 84) {
    if (idNum >= 70 && idNum <= 72) {
      // First row - Luang Prabang Discovery specific highlights
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience traditional Elephant Village interactions',
        'Witness sacred alms-giving ceremony at dawn',
        'Hands-on Lao cooking class with organic ingredients',
        'Mekong River boat trip with scenic landscapes',
        'Visit Wat Xieng Thong temple (classic Lao architecture)',
        'Explore Royal Palace Museum and cultural heritage',
        'Browse vibrant Night Market for local crafts'
      ];
    }
    if (idNum >= 73 && idNum <= 75) {
      // Second row - Luang Prabang Highlights specific highlights (same as first row)
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience traditional Elephant Village interactions',
        'Witness sacred alms-giving ceremony at dawn',
        'Climb Phousi Hill for panoramic mountain views',
        'Mekong River sunset cruise with mountain backdrop',
        'Visit Bear Rescue Center and wildlife conservation',
        'Explore traditional weaving at Ock Pop Tok Center',
        'Browse colorful Night Market for local handicrafts'
      ];
    }
    if (idNum >= 76 && idNum <= 78) {
      // Third row - Laos Discovery Luang Prabang to Vientiane highlights
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience capital city Vientiane with golden temples',
        'Visit fascinating Buddha Park with 200+ sculptures',
        'High-speed train journey from Luang Prabang to Vientiane',
        'Explore That Luang Stupa and Patuxay Monument',
        'Done Xing Xu Island peaceful riverside community',
        'Sacred alms-giving ceremony and morning markets',
        'Mekong Riverfront sunset views and local culture'
      ];
    }
    if (idNum >= 79 && idNum <= 81) {
      // Fourth row - Default Laos highlights
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience traditional alms-giving ceremony at dawn',
        'Scenic Mekong River cruise with sunset views',
        'Visit ancient Buddhist temples and monasteries',
        'Explore vibrant night markets and local handicrafts',
        'Traditional Lao cuisine and cooking experiences',
        'Comfortable accommodation with daily breakfast',
        'Professional English-speaking guide throughout'
      ];
    }
    if (idNum >= 82 && idNum <= 84) {
      // Fifth row - 8-Day Laos Heritage & Nature Discovery highlights
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Private Baci Ceremony for welcome and good fortune',
        'Visit mystical Pak Ou Caves with thousands of Buddha images',
        'Discover spectacular Kuang Si Waterfall with turquoise pools',
        'Experience cool highlands of Bolaven Plateau',
        'Ancient Khmer temple complex Wat Phou (UNESCO site)',
        '4,000 Islands region with Don Khong and Don Khone',
        'Khone Phapheng Falls - largest waterfall in Southeast Asia',
        'Tea and coffee plantations with local craft villages',
        'Sacred alms-giving ceremony and cultural immersion'
      ];
    }
    return [
      'Airport transfers with meet & greet service',
      'Explore UNESCO World Heritage city of Luang Prabang',
      'Visit ancient Buddhist temples and monasteries',
      'Experience traditional alms-giving ceremony at dawn',
      'Scenic Mekong River cruise with sunset views',
      'Discover Kuang Si Waterfalls with turquoise pools',
      'Explore vibrant night markets and local handicrafts',
      'Traditional Lao cuisine and cooking experiences',
      'Comfortable accommodation with daily breakfast',
      'Professional English-speaking guide throughout'
    ];
  }
  
  // Vietnam specific overview
  if (idNum >= 58 && idNum <= 69) {
    const starLevel = idNum <= 60 ? (idNum === 58 ? '3-star' : idNum === 59 ? '4-star' : '5-star') :
      idNum <= 63 ? (idNum === 61 ? '3-star' : idNum === 62 ? '4-star' : '5-star') :
      idNum <= 66 ? (idNum === 64 ? '3-star' : idNum === 65 ? '4-star' : '5-star') :
      (idNum === 67 ? '3-star' : idNum === 68 ? '4-star' : '5-star');
    
    return [
      'Airport transfers with meet & greet service',
      'Explore bustling Ho Chi Minh City (Saigon)',
      'Visit historic Hanoi with Old Quarter walking tour',
      'Scenic Halong Bay cruise with limestone karsts',
      'Discover ancient town of Hoi An with lantern festival',
      'Cu Chi Tunnels underground war history experience',
      'Traditional Vietnamese cuisine and cooking classes',
      `${starLevel} accommodation with daily breakfast`,
      'Professional English-speaking guide throughout',
      'All transfers in private AC vehicle'
    ];
  }
  
  // Sri Lanka specific overview
  if (idNum >= 40 && idNum <= 57) {
    const starLevel = idNum <= 42 || (idNum >= 43 && idNum <= 45) || (idNum >= 49 && idNum <= 51) || (idNum >= 52 && idNum <= 54) || (idNum >= 55 && idNum <= 57) ? 
      (idNum === 40 || idNum === 43 || idNum === 46 || idNum === 49 || idNum === 52 || idNum === 55 ? '3-star' : 
       idNum === 41 || idNum === 44 || idNum === 47 || idNum === 50 || idNum === 53 || idNum === 56 ? '4-star' : '5-star') : '4-star';
    
    return [
      'Airport transfers with meet & greet service',
      'Visit iconic Pinnawala Elephant Orphanage',
      'Explore Temple of the Sacred Tooth Relic in Kandy',
      'Tea plantation tour with factory visit and tasting',
      'Scenic Madu River boat safari with wildlife spotting',
      'Kosgoda Sea Turtle Conservation Project visit',
      'Comprehensive Colombo city tour with shopping',
      `${starLevel} accommodation with daily breakfast`,
      'Professional English-speaking guide throughout',
      'All transfers in private AC vehicle'
    ];
  }
  
  // Dubai specific overview
  const base = [
    'Arrival in city with Hotel Transfer and Dhow Cruise Dinner',
    'Half-Day City Tour with Burj Khalifa (124th Floor)',
    'Desert Safari Adventure with BBQ Dinner and Entertainment',
    'Comfortable hotel accommodation with daily breakfast',
    'All transfers in private AC vehicle',
    'Professional English-speaking tour guide',
  ];

  if ([2,5,8].includes(idNum)) {
    return [
      base[0], base[1], base[2], 'Dubai Miracle Garden and Global Village Visit', base[3], base[4]
    ];
  }
  if ([3,6,9].includes(idNum)) {
    return [
      base[0], base[1], base[2], 'Dubai Miracle Garden and Global Village Visit', 'Full-Day Abu Dhabi City Tour with Sheikh Zayed Grand Mosque', base[3]
    ];
  }
  if (idNum>=11 && idNum<=25){
    // Generic for Bali/Thailand/Singapore
    return [
      'Airport transfers and accommodation',
      'Daily breakfast at hotel',
      'Sightseeing tours with professional guide',
      'Cultural experiences and activities',
      'All transfers in private AC vehicle',
    ];
  }
  return base;
}

function getItinerary(id, destination){
  const city = destination.split(',')[0];
  const idNum = Number(id);
  
  // Andaman specific itinerary
  if (idNum >= 91 && idNum <= 100) {
    // 5N/6D packages (second row and others)
    if (idNum >= 93 && idNum <= 96) {
      return [
        {
          title: 'Day 1: Arrival at Port Blair',
          paragraphs: [
            'Welcome to Port Blair! Check in to your hotel and unwind. In the afternoon, head to Corbyn\'s Cove Beach for some sun and sea.',
            'Later, experience the moving Sound & Light Show at the historic Cellular Jail.',
            'Overnight stay in Port Blair.'
          ]
        },
        {
          title: 'Day 2: Port Blair ➜ Havelock Island',
          paragraphs: [
            'After breakfast, sail to Havelock Island by cruise. Known for its crystal-clear waters and vibrant marine life, this paradise is perfect for diving and snorkelling.',
            'Check in and relax, then visit the scenic Kalapathar Beach.',
            'Overnight in Havelock.'
          ]
        },
        {
          title: 'Day 3: Explore Havelock',
          paragraphs: [
            'Enjoy a relaxed breakfast before heading to the world-famous Radhanagar Beach (Beach No. 7) – rated one of Asia\'s best.',
            'Spend the day soaking in the beauty, swimming, or just lazing by the shore.',
            'Overnight in Havelock.'
          ]
        },
        {
          title: 'Day 4: Havelock ➜ Neil Island',
          paragraphs: [
            'After breakfast, visit Elephant Beach (or Lighthouse Beach, subject to weather) for snorkelling and water activities.',
            'Later, transfer to Neil Island.',
            'Overnight stay in Neil.'
          ]
        },
        {
          title: 'Day 5: Neil Island ➜ Port Blair',
          paragraphs: [
            'Visit Laxmanpur Beach, Bharatpur Beach, and the natural Howrah Bridge formation.',
            'Enjoy the island\'s tranquil vibes before heading back to Port Blair in the evening.',
            'Overnight stay in Port Blair.'
          ]
        },
        {
          title: 'Day 6: Departure',
          paragraphs: [
            'Transfer to the airport with unforgettable memories of the Andamans!'
          ]
        }
      ];
    }
    // 6N/7D packages (third row)
    else if (idNum >= 97 && idNum <= 99) {
      return [
        {
          title: 'Day 1: Arrival at Port Blair',
          paragraphs: [
            'Arrive at Port Blair Airport and transfer to your hotel with assistance from our representative. After check-in, visit Corbyn\'s Cove Beach — a palm-fringed paradise ideal for swimming and sunbathing.',
            'In the evening, witness the historic Sound & Light Show at Cellular Jail, narrating India\'s freedom struggle.',
            'Overnight stay at Port Blair.'
          ]
        },
        {
          title: 'Day 2: Ross Island & North Bay (Coral Island)',
          paragraphs: [
            'After breakfast, take a boat trip to explore the colonial ruins of Ross Island, followed by North Bay Island — famous for its vibrant coral reefs and underwater marine life.',
            'Return to Port Blair for an overnight stay.'
          ]
        },
        {
          title: 'Day 3: Port Blair – Havelock Island',
          paragraphs: [
            'Post breakfast, board a cruise to Havelock Island, known for its serene beaches and crystal-clear waters ideal for snorkeling and diving.',
            'On arrival, check in to your hotel and relax. Later, visit Kalapathar Beach for a peaceful sunset view.',
            'Overnight at Havelock.'
          ]
        },
        {
          title: 'Day 4: Havelock – Radhanagar Beach',
          paragraphs: [
            'After breakfast, visit Radhanagar Beach (Beach No. 7), rated among Asia\'s best beaches for its powdery white sand and turquoise waters.',
            'Spend the day relaxing or swimming.',
            'Overnight at Havelock.'
          ]
        },
        {
          title: 'Day 5: Havelock – Neil Island',
          paragraphs: [
            'After breakfast, head to Elephant Beach or Light House (as per weather conditions) — great for snorkeling and water sports.',
            'Later, proceed to Neil Island by ferry.',
            'Overnight stay at Neil Island.'
          ]
        },
        {
          title: 'Day 6: Neil Island – Port Blair',
          paragraphs: [
            'After breakfast, explore Bharatpur Beach, Laxmanpur Beach, and the natural rock formation at Howrah Bridge.',
            'Later, return to Port Blair by evening ferry.',
            'Overnight stay at Port Blair.'
          ]
        },
        {
          title: 'Day 7: Departure',
          paragraphs: [
            'Transfer to the airport for your return flight with beautiful memories of the Andaman Islands.'
          ]
        }
      ];
    }
    // 4N/5D packages (first row)
    else {
      return [
        {
          title: 'Day 1: Arrival at Port Blair',
          paragraphs: [
            'Arrive at Port Blair Airport and check in at your hotel. Later, unwind at Corbyn\'s Cove Beach, perfect for swimming and sunbathing.',
            'In the evening, witness the Sound & Light Show at Cellular Jail, narrating India\'s freedom struggle.',
            'Overnight: Port Blair'
          ]
        },
        {
          title: 'Day 2: Port Blair → Havelock Island',
          paragraphs: [
            'After breakfast, transfer to the jetty and cruise to Havelock Island — a paradise known for crystal-clear waters and vibrant marine life.',
            'Check in at your resort and later visit the world-famous Radhanagar Beach (Beach No. 7), crowned as Asia\'s Best Beach by Time Magazine.',
            'Overnight: Havelock Island'
          ]
        },
        {
          title: 'Day 3: Havelock – Elephant Beach Excursion',
          paragraphs: [
            'Post breakfast, head for a thrilling speedboat trip to Elephant Beach, a hotspot for snorkeling, jet skiing, and underwater sea walks (activities on direct payment basis).',
            'Return to the resort for a relaxed evening.',
            'Overnight: Havelock Island'
          ]
        },
        {
          title: 'Day 4: Havelock → Port Blair + Shopping',
          paragraphs: [
            'After breakfast, board the morning cruise back to Port Blair.',
            'Spend the rest of the day shopping for souvenirs or exploring the local markets at leisure.',
            'Overnight: Port Blair'
          ]
        },
        {
          title: 'Day 5: Departure',
          paragraphs: [
            'After breakfast, transfer to the airport for your flight home, carrying unforgettable memories of your Andaman adventure.'
          ]
        }
      ];
    }
  }
  
  // Laos specific itinerary
  if (idNum >= 70 && idNum <= 84) {
    if (idNum >= 70 && idNum <= 72) {
      // 3D2N Luang Prabang Discovery
      return [
        {
          title: 'Day 1: Arrival – Luang Prabang City Tour (No Meal)',
          paragraphs: [
            'Arrive in Luang Prabang and transfer to your hotel. After a short rest, start exploring the city with a visit to Wat Xieng Thong, a masterpiece of classic Lao architecture.',
            'Continue to the Royal Palace Museum to learn about the city\'s royal heritage.',
            'Climb Phousi Hill for a panoramic sunset view over the Mekong River, then browse the vibrant Night Market, known for its local textiles and crafts.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 2: Luang Prabang – Cooking Class – Pak Ou Caves (B, L)',
          paragraphs: [
            'After breakfast, visit the Heuan Chan Heritage House to explore traditional Lao architecture and artifacts.',
            'Join a hands-on cooking class using local organic ingredients, followed by lunch featuring your own creations.',
            'In the afternoon, take a boat trip on the Mekong River to the Pak Ou Caves, filled with thousands of Buddha statues.',
            'Stop at Ban Xanghai Village to sample local rice wine before returning to town.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 3: Alms Giving – Kuang Si Waterfall – Departure (B)',
          paragraphs: [
            'Rise early to witness or take part in the morning alms-giving ritual, a deeply spiritual Lao tradition.',
            'Visit the local morning market before heading to the breathtaking Kuang Si Waterfall, where you can swim or visit the nearby Bear Rescue Center.',
            'On the way back, stop by the Ock Pop Tok Living Craft Center to see traditional weaving before transferring to the airport for your onward flight.'
          ]
        }
      ];
    }
    if (idNum >= 73 && idNum <= 75) {
      // 4D3N Luang Prabang Highlights
      return [
        {
          title: 'Day 1: Arrival in Luang Prabang (No Meal)',
          paragraphs: [
            'Arrive at Luang Prabang Airport and transfer to your hotel (early check-in subject to availability).',
            'Nestled in northern Laos, Luang Prabang is a UNESCO World Heritage city famed for its serene charm and fusion of natural beauty and ancient architecture.',
            'The rest of the day is free for you to explore the old town at your own pace.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 2: City Tour & Pak Ou Caves (B)',
          paragraphs: [
            'After breakfast, visit the Royal Palace Museum, once home to King Sisavang Vong.',
            'Continue with a relaxing boat cruise along the Mekong River to the Pak Ou Caves, filled with thousands of Buddha statues. Stop by Ban Xanghai Village to sample local rice wine.',
            'Back in town, explore Wat Sene and Wat Xiengthong, the city\'s most exquisite temple, then visit Heuan Chan Heritage House to learn about Lao traditions and enjoy authentic Lao coffee or tea.',
            'End the day watching the sunset at Wat Prabath and browsing the colorful Night Market.',
            'Optional: Visit the Traditional Art and Ethnology Center (closed Mondays). Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 3: Alms Giving – Kuang Si Waterfall – Sunset Cruise (B)',
          paragraphs: [
            'Rise early to witness the sacred alms-giving ceremony, followed by a visit to the lively morning market.',
            'After breakfast, climb Phousi Hill for panoramic views before heading to the stunning Kuang Si Waterfall for swimming and relaxation.',
            'Visit the Bear Rescue Center and Ock Pop Tok Living Crafts Center to see traditional weaving and enjoy the riverside view.',
            'Later, unwind on a sunset cruise along the Mekong River, watching the sun dip behind the mountains.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 4: Elephant Village Experience – Departure (B, L)',
          paragraphs: [
            'After breakfast, transfer to the Elephant Village Camp. Learn about elephant care, try feeding them, and visit the elephant hospital, museum, and handmade paper workshop.',
            'Enjoy a short boat ride to Tad Sae Waterfall, where you can relax or take a swim.',
            'Lunch is served at the camp before returning to town for your transfer to the airport.'
          ]
        }
      ];
    }
    if (idNum >= 76 && idNum <= 78) {
      // 6D5N Laos Discovery – Luang Prabang to Vientiane
      return [
        {
          title: 'Day 1: Arrival in Luang Prabang (No Meal)',
          paragraphs: [
            'Arrive at Luang Prabang Airport and transfer to your hotel (early check-in subject to availability).',
            'A UNESCO World Heritage city, Luang Prabang charms visitors with its blend of history, spirituality, and nature.',
            'The rest of the day is free to explore at your own pace.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 2: Mekong River Cruise & Pak Ou Caves (B)',
          paragraphs: [
            'After breakfast, visit the Royal Palace Museum, then embark on a scenic Mekong River cruise to the Pak Ou Caves, home to thousands of Buddha statues.',
            'Stop at Ban Xanghai Village to sample traditional rice wine.',
            'Back in town, explore Wat Sene, the stunning Wat Xiengthong, and Heuan Chan Heritage House, where you\'ll enjoy a cup of Lao coffee or tea.',
            'End the day watching the sunset at Wat Prabath before exploring the lively Night Market.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 3: Alms Giving – Kuang Si Waterfall – Vientiane (Train) (B)',
          paragraphs: [
            'Rise early to witness the morning alms-giving ceremony, followed by a stroll through the bustling local market.',
            'Climb Phousi Hill for panoramic city views, then visit the breathtaking Kuang Si Waterfall and the nearby Bear Rescue Center.',
            'Stop at Ock Pop Tok Living Crafts Center before boarding the speed train to Vientiane (approx. 2 hrs).',
            'Upon arrival, transfer to your hotel. Overnight in Vientiane.'
          ]
        },
        {
          title: 'Day 4: Vientiane City Tour & Buddha Park (B)',
          paragraphs: [
            'Begin at Wat Si Muang, famous for its sacred energy, then drive to the fascinating Buddha Park, filled with over 200 religious sculptures.',
            'Visit COPE Center to learn about UXO clearance efforts.',
            'In the afternoon, discover Vientiane\'s key landmarks – the golden That Luang Stupa, Patuxay Monument, Wat Sisaket, and Wat Phra Keo.',
            'End the day relaxing along the Mekong Riverfront at sunset. Optional: Visit Sinouk Coffee Pavilion to learn about Lao coffee culture.',
            'Overnight in Vientiane.'
          ]
        },
        {
          title: 'Day 5: Done Xing Xu Island Excursion (B, L)',
          paragraphs: [
            'Travel to Ban Kaolieu and take a short boat ride to Xing Xu Island, a peaceful riverside community.',
            'Visit a local temple, stroll through the village, and enjoy a tuk-tuk or tractor tour around the island.',
            'Savor a local lunch and enjoy leisure time before returning to Vientiane in the afternoon.',
            'Overnight in Vientiane.'
          ]
        },
        {
          title: 'Day 6: Vientiane – Departure (B)',
          paragraphs: [
            'Free at leisure for last-minute shopping or exploration before transferring to the airport for your onward flight.'
          ]
        }
      ];
    }
    if (idNum >= 82 && idNum <= 84) {
      // 8-Day Laos Heritage & Nature Discovery
      return [
        {
          title: 'Day 1: Arrival in Luang Prabang – Baci Ceremony (D)',
          paragraphs: [
            'Arrive in Luang Prabang, a UNESCO World Heritage city famed for its timeless charm and cultural treasures.',
            'After hotel check-in and rest, take a leisurely walk to soak in the peaceful atmosphere of the old town.',
            'In the evening, participate in a private Baci Ceremony at a local home — a heartfelt Lao ritual of welcome and good fortune.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 2: Luang Prabang City Highlights – Pak Ou Caves (B)',
          paragraphs: [
            'Explore the Royal Palace Museum, then cruise along the Mekong River to the mystical Pak Ou Caves, filled with thousands of Buddha images.',
            'Stop at Ban Xanghai village to sample traditional rice wine.',
            'Return to visit Wat Sene and the elegant Wat Xiengthong.',
            'Continue to Heuan Chan Heritage House for a glimpse into aristocratic Lao life, followed by a coffee or tea tasting.',
            'Enjoy sunset views from Wat Prabath before browsing the vibrant Night Market.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 3: Alms Giving – Kuang Si Waterfall (B)',
          paragraphs: [
            'Join the sacred morning alms-giving ritual, then explore the bustling local market.',
            'Climb Mount Phousi for panoramic views before heading to Kuang Si Waterfall, a spectacular three-tier cascade with turquoise pools perfect for swimming.',
            'Visit nearby Ban Thapene Village, the Bear Rescue Center, and the Ock Pop Tok Living Craft Center.',
            'Optional stops: Buffalo Dairy Farm or Butterfly Park.',
            'Overnight in Luang Prabang.'
          ]
        },
        {
          title: 'Day 4: Luang Prabang – Pakse – Bolaven Plateau (B)',
          paragraphs: [
            'Fly to Pakse and journey to the cool highlands of the Bolaven Plateau.',
            'Visit tea and coffee plantations, Tad Fan Waterfall, and local craft villages known for knife forging and bamboo weaving.',
            'Take a refreshing dip at Tad Yeung Waterfall before settling into your mountain retreat.',
            'Overnight on the Bolaven Plateau.'
          ]
        },
        {
          title: 'Day 5: Bolaven Plateau – Wat Phou – Khong Island (B)',
          paragraphs: [
            'Discover the ethnic markets and minority villages of the Plateau before driving to Wat Phou, an ancient Khmer temple complex and UNESCO World Heritage Site.',
            'Continue to Don Khong Island in the 4,000 Islands region and enjoy the rest of the day at leisure.',
            'Overnight on Khong Island.'
          ]
        },
        {
          title: 'Day 6: 4,000 Islands – Khone Island Exploration (B)',
          paragraphs: [
            'Cruise the Mekong to Don Khone, once a French colonial outpost.',
            'Explore the old railway remnants and the impressive Liphi Waterfall.',
            'Visit a local pagoda and village before enjoying sunset over the Mekong.',
            'Optional cycling around the island.',
            'Overnight on Khone Island.'
          ]
        },
        {
          title: 'Day 7: Khone Island – Khone Phapheng – Pakse (B)',
          paragraphs: [
            'Return to the mainland and visit Khone Phapheng Falls, the largest waterfall in Southeast Asia.',
            'Travel back to Pakse, visiting Ban Khoh stone-carving village and Wat Chomphet.',
            'End the day with sweeping sunset views from Wat Phou Salao.',
            'Overnight in Pakse.'
          ]
        },
        {
          title: 'Day 8: Pakse – Ubon Ratchathani – Departure (B)',
          paragraphs: [
            'After breakfast, transfer to Ubon Ratchathani Airport (Thailand) via the Chongmek Border for your flight to Bangkok or onward destination.',
            'Transfer time: approx. 3 hours.'
          ]
        }
      ];
    }
    // Default Laos itinerary for other packages
    return [
      {
        title: 'Day 1: Arrival in Vientiane',
        paragraphs: ['Arrive and explore the capital city with its temples and monuments.']
      },
      {
        title: 'Day 2: Vientiane to Luang Prabang',
        paragraphs: ['Travel to UNESCO World Heritage city and temple visits.']
      },
      {
        title: 'Day 3: Luang Prabang Discovery',
        paragraphs: ['Alms ceremony, Kuang Si Waterfalls, and cultural experiences.']
      },
      {
        title: 'Day 4: Vang Vieng Adventure',
        paragraphs: ['Scenic landscapes, caves, and outdoor activities.']
      },
      {
        title: 'Final Day: Departure',
        paragraphs: ['Transfer to airport for departure.']
      }
    ];
  }
  
  // Vietnam specific itinerary
  if (idNum >= 58 && idNum <= 69) {
    if (idNum >= 58 && idNum <= 60) {
      // 4-Day Hanoi – Ha Long Bay Discovery Tour
      return [
        {
          title: 'Day 01: Arrival in Hanoi',
          paragraphs: [
            'Upon arrival at Noi Bai International Airport, you will be warmly welcomed by our local guide and transferred to your hotel in Hanoi city center. The drive takes approximately 40 minutes.',
            'Hanoi, meaning "River-bound City", is Vietnam\'s capital and one of Asia\'s most captivating cities. With over a thousand years of history dating back to 1010, Hanoi is known for its rich cultural heritage and timeless beauty.',
            'In the late afternoon, visit Hoan Kiem Lake, the symbolic heart of Hanoi. The lake\'s name, "Lake of the Returned Sword," comes from a local legend in which a sacred sword was returned to a divine turtle.',
            'Explore the Old Quarter, famous for its 36 ancient streets — each historically named after the goods once sold there. This vibrant area offers an authentic glimpse of local life.',
            'Spend the evening at leisure, relaxing at your hotel or exploring the city\'s lively atmosphere on your own.'
          ]
        },
        {
          title: 'Day 02: Hanoi City Tour – Transfer to Ha Long Bay',
          paragraphs: [
            'After breakfast, begin your city tour of Hanoi with a visit to the Ho Chi Minh Complex, a significant site that reflects the life and legacy of Vietnam\'s national hero.',
            'Visit the Ho Chi Minh Mausoleum, the Presidential Palace, and Ho Chi Minh\'s house on stilts, where he lived a simple life dedicated to his people.',
            'Stop at the One Pillar Pagoda, one of Vietnam\'s most iconic landmarks. Built in the 11th century, this lotus-shaped wooden pagoda was constructed to honor the Buddha of Compassion.',
            'Continue to the Temple of Literature, founded in 1070 and known as Vietnam\'s first university. The temple is dedicated to Confucius and honors scholars.',
            'In the afternoon, depart for Ha Long Bay, a UNESCO World Heritage Site approximately 160 km from Hanoi. The drive offers picturesque views of Vietnam\'s countryside.',
            'Upon arrival, check in to your hotel and spend the evening at leisure.'
          ]
        },
        {
          title: 'Day 03: Ha Long Bay Excursion – Return to Hanoi',
          paragraphs: [
            'After an early breakfast, transfer to the pier for your Ha Long Bay cruise — one of Vietnam\'s most famous natural wonders. The name "Ha Long" means "Descending Dragon".',
            'Board your boat and begin your journey through the emerald waters and towering limestone islands of Ha Long Bay.',
            'Visit Thien Cung Cave (Heavenly Palace), known for its stunning stalactites and stalagmites, and Dau Go Cave (Wooden Stakes Cave).',
            'Enjoy a Vietnamese lunch at a local restaurant before driving back to Hanoi.',
            'Spend the late afternoon and evening exploring the Old Quarter, where you can shop for souvenirs or enjoy the lively ambiance of local cafés.'
          ]
        },
        {
          title: 'Day 04: Hanoi – Departure',
          paragraphs: [
            'Enjoy your morning at leisure for some last-minute shopping or relaxation before your transfer to Noi Bai International Airport for your departure flight.',
            'We hope you leave Vietnam with unforgettable memories of its history, beauty, and warm hospitality.'
          ]
        }
      ];
    }
    if (idNum >= 61 && idNum <= 63) {
      // 5-Day Vietnam Discovery Tour: Hanoi – Ha Long Bay – Ninh Binh
      return [
        {
          title: 'DAY 01: ARRIVAL IN HANOI',
          paragraphs: [
            'Arrive at Noi Bai International Airport, where you\'ll be warmly greeted by our local guide and transferred to your hotel (approx. 40 minutes\' drive).',
            'Known as the "City within the River\'s Bend," Hanoi is Vietnam\'s thousand-year-old capital, founded in 1010. Its timeless charm lies in the harmonious blend of ancient temples, French colonial architecture, tree-lined boulevards, serene lakes, and historic streets.',
            'In the late afternoon, visit Hoan Kiem Lake, the symbolic heart of Hanoi. The lake\'s name, meaning "Lake of the Returned Sword," originates from a legend about Emperor Le Loi and a sacred sword returned to a divine turtle.',
            'Enjoy a leisurely stroll or shopping time in the Old Quarter, famous for its 36 ancient streets, each once dedicated to a specific trade.',
            'Meals: None | Accommodation: Hotel in Hanoi'
          ]
        },
        {
          title: 'DAY 02: HANOI – HALONG BAY',
          paragraphs: [
            'After breakfast, embark on a city tour exploring the key historical and cultural sites of Hanoi:',
            'Ho Chi Minh Complex: Ho Chi Minh Mausoleum (closed Mondays, Fridays, and during October–November), Presidential Palace (fine French colonial architecture), Ho Chi Minh\'s Stilt House (his simple living and working place).',
            'One Pillar Pagoda: An 11th-century temple symbolizing a lotus blossom of purity.',
            'Temple of Literature: Vietnam\'s first university, built in 1070 to honor Confucius and outstanding scholars.',
            'In the afternoon, depart for Ha Long Bay (approx. 160 km, 3.5 hours). The scenic drive offers glimpses of Vietnam\'s peaceful countryside, with lush rice fields and village life.',
            'Check into your hotel and enjoy the evening at leisure. | Meals: Breakfast | Accommodation: Hotel in Ha Long'
          ]
        },
        {
          title: 'DAY 03: HALONG BAY – HANOI',
          paragraphs: [
            'After an early breakfast (6:00–7:00 AM), transfer to the pier and board a boat to explore the world-famous Ha Long Bay, a UNESCO World Heritage Site.',
            'The name "Ha Long," meaning "Descending Dragon," comes from a legend of dragons sent by heaven to protect Vietnam.',
            'Cruise among thousands of limestone islands and visit: Thien Cung (Heaven Palace) Cave – adorned with magnificent stalactites and stalagmites, and Dau Go (Wooden Stakes) Cave – linked to 13th-century naval victories.',
            'Return to the pier and enjoy lunch at a local restaurant before driving back to Hanoi.',
            'Spend the afternoon shopping and exploring the Old Quarter. | Meals: Breakfast, Lunch | Accommodation: Hotel in Hanoi'
          ]
        },
        {
          title: 'DAY 04: HANOI – NINH BINH (Choose One Option)',
          paragraphs: [
            'Option 1: Full-Day Tam Coc & Bich Dong Tour - Visit Tam Coc – Bich Dong, "Ha Long Bay on Land" with breathtaking limestone karsts. Boat trip along Hoang Long River through three natural caves. Visit Hoa Lu Ancient Capital, Vietnam\'s first capital in the 10th century.',
            'Option 2: Full-Day Trang An Tour - Visit Bai Dinh Pagoda Complex, Vietnam\'s largest Buddhist center. Continue to Trang An Eco-Tourism Complex for boat trip through scenic landscapes, passing through caves such as Sang (Light), Toi (Dark), Ba Giot (Three Drops), and Nau Ruou (Wine Brewing).',
            'Return to Hanoi in the late afternoon. | Meals: Breakfast | Accommodation: Hotel in Hanoi'
          ]
        },
        {
          title: 'DAY 05: HANOI DEPARTURE',
          paragraphs: [
            'Enjoy free time for last-minute shopping or relaxation until your transfer to Noi Bai International Airport for your departure flight.',
            'Meals: Breakfast'
          ]
        }
      ];
    }
    if (idNum >= 64 && idNum <= 66) {
      // 7 Days Vietnam Classic Tour: Hanoi - Ho Chi Minh - Cu Chi Tunnel - Mekong Delta
      return [
        {
          title: 'DAY 01: ARRIVAL IN HANOI',
          paragraphs: [
            'Upon arrival at Noi Bai International Airport, meet our representative who will warmly welcome you and assist with your transfer to the hotel (approximately a 40-minute drive).',
            'Hanoi, meaning "City within the Rivers," is Vietnam\'s thousand-year-old capital, founded in 1010. The city enchants visitors with its timeless charm—ancient temples, narrow streets lined with traditional houses, graceful French colonial architecture, leafy boulevards, and serene lakes.',
            'Meals: No meals included | Accommodation: Hotel in Hanoi'
          ]
        },
        {
          title: 'DAY 02: HANOI CITY DISCOVERY TOUR',
          paragraphs: [
            'Morning: Begin your day with a visit to the Ho Chi Minh Complex, dedicated to the life and legacy of the nation\'s beloved leader. Explore the Ho Chi Minh Mausoleum, the Presidential Palace, and the iconic One Pillar Pagoda.',
            'Continue to the Temple of Literature, Vietnam\'s first university, founded in 1070 during the Ly Dynasty to honor Confucius and distinguished scholars.',
            'Afternoon: Choose one museum to explore from: Museum of Fine Arts, National Museum of Vietnamese History, Museum of the Revolution, Museum of Military History, or Museum of Ethnology.',
            'Later, visit the picturesque Hoan Kiem Lake, the heart of Hanoi, famous for its legend of the "Returned Sword." Conclude the day with a leisurely walk or shopping spree in the bustling Old Quarter, known for its 36 historic streets.',
            'Meals: Breakfast | Accommodation: Hotel in Hanoi'
          ]
        },
        {
          title: 'DAY 03: HANOI → HA LONG BAY (CRUISE EXPERIENCE)',
          paragraphs: [
            'After breakfast, depart from Hanoi at around 8:00 AM for a scenic drive to Ha Long Bay (approximately 160 km or 3.5 hours). Stop at a local handicraft workshop showcasing fine embroidery and traditional products.',
            'Upon arrival in Ha Long City around 11:30 AM, board your cruise and enjoy a welcome drink. As the boat begins to sail, savor lunch while taking in breathtaking views of the limestone karsts and emerald waters.',
            'Ha Long Bay, or "Bay of the Descending Dragon," is a UNESCO World Heritage Site comprising over 2,000 islands and islets formed over 500 million years.',
            'Visit notable spots such as Dinh Huong Island, Ga Choi Island, Dog Island, Sail Island, and explore the stunning Sung Sot Cave. Stop for a refreshing swim at Titov Beach before watching the sunset over the bay.',
            'Enjoy dinner on board and perhaps try your hand at night squid fishing. | Meals: Breakfast, Lunch, Dinner | Accommodation: Overnight cruise on Ha Long Bay'
          ]
        },
        {
          title: 'DAY 04: HA LONG BAY → HANOI → FLIGHT TO HO CHI MINH CITY (SAIGON)',
          paragraphs: [
            'Wake early to witness the peaceful beauty of dawn over Ha Long Bay. Enjoy breakfast as the cruise continues past Human Head Island and Tortoise Island toward Bai Tu Long Bay, known as "The Little Dragon Bowing to His Mother."',
            'Check out and enjoy lunch (or brunch) while cruising back to the pier. Disembark and transfer to Hanoi Airport for your flight to Ho Chi Minh City (Saigon).',
            'Upon arrival, meet your guide and transfer to your hotel. Ho Chi Minh City, formerly Saigon, is Vietnam\'s largest metropolis and economic hub—a dynamic blend of modern energy and historical charm.',
            'Meals: Breakfast, Lunch (or Brunch) | Accommodation: Hotel in Saigon'
          ]
        },
        {
          title: 'DAY 05: CU CHI TUNNELS & SAIGON CITY TOUR',
          paragraphs: [
            'Morning: Drive 75 km northwest of Saigon to visit the Cu Chi Tunnels, a vast underground network once used as a hideout and base by Viet Cong forces during the wars.',
            'The tunnels—stretching over 120 km—contained living quarters, meeting rooms, kitchens, hospitals, and escape routes, illustrating the ingenuity and resilience of Vietnamese soldiers.',
            'Afternoon: Return to the city for a sightseeing tour of Saigon\'s major landmarks. View the exterior of Notre-Dame Cathedral (currently under renovation) and the Central Post Office, designed by the renowned architect Gustave Eiffel.',
            'Continue to the War Remnants Museum, showcasing artifacts and photographs from Vietnam\'s wartime history. End your day exploring or shopping at the vibrant Ben Thanh Market.',
            'Meals: Breakfast | Accommodation: Hotel in Saigon'
          ]
        },
        {
          title: 'DAY 06: FULL-DAY EXCURSION TO MY THO – MEKONG DELTA',
          paragraphs: [
            'After breakfast, embark on a scenic two-hour drive (approximately 65 km) to My Tho, the gateway to the Mekong Delta, known as Vietnam\'s "rice bowl."',
            'Board a local boat to cruise through the delta\'s maze of canals, observing daily life along the waterways.',
            'Visit Unicorn Island to stroll through lush orchards, sample fresh tropical fruits, and enjoy traditional southern folk music.',
            'Continue to Ben Tre Province to visit a rural coconut candy workshop, take a short walk through the village, and experience a horse-drawn carriage ride.',
            'Stop by a local bee farm to taste fresh honey and honey tea before returning to Ho Chi Minh City. | Meals: Breakfast | Accommodation: Hotel in Saigon'
          ]
        },
        {
          title: 'DAY 07: SAIGON DEPARTURE',
          paragraphs: [
            'Enjoy your morning at leisure for last-minute shopping or relaxation before your transfer to the airport for your departure flight.',
            'Meals: Breakfast'
          ]
        }
      ];
    }
    
    if (idNum >= 67 && idNum <= 69) {
      // Southern Classic of Vietnam: Saigon – Cu Chi Tunnels – My Tho – Saigon (3N/4D)
      return [
        {
          title: 'DAY 01: ARRIVAL IN SAIGON (HO CHI MINH CITY)',
          paragraphs: [
            'Upon arrival at Tan Son Nhat International Airport, meet your local guide and transfer to your hotel for check-in.',
            'Ho Chi Minh City, still affectionately called Saigon, is Vietnam\'s largest metropolis and commercial hub. The city buzzes with energy — a vibrant mix of modern skyscrapers, bustling markets, motorbikes, and colonial landmarks that reflect its rich past.',
            'In the afternoon, enjoy a half-day city tour, starting with a visit to the Notre-Dame Cathedral (exterior view only, under renovation until 2023) — a neo-Romanesque masterpiece built by the French with materials imported from Marseille.',
            'Continue to the Saigon Central Post Office, a beautifully preserved colonial structure designed by Gustave Eiffel.',
            'Next, explore Cho Lon (Chinatown) — a lively district filled with markets, temples, and traditional medicine shops. Conclude your day at the Jade Emperor Pagoda (Phuoc Hai Temple), a rare Taoist temple built by the Cantonese community in 1909.',
            'Meals: None | Accommodation: Hotel in Saigon'
          ]
        },
        {
          title: 'DAY 02: SAIGON – CU CHI TUNNELS – CITY TOUR',
          paragraphs: [
            'After breakfast, drive 75 km northwest of Saigon to explore the Cu Chi Tunnels, an extraordinary underground network used by the Viet Cong during the wars against the French and the Americans.',
            'Stretching more than 120 km, the tunnels contained meeting rooms, kitchens, clinics, and storage areas — ingeniously constructed to withstand bombings and long sieges.',
            'Learn about the resilience and ingenuity of the Vietnamese fighters as you explore this historic site. Return to Saigon by noon and enjoy some leisure time.',
            'In the afternoon, visit the War Remnants Museum, which houses powerful exhibits, photographs, and military artifacts from Vietnam\'s wartime history.',
            'Later, enjoy free time to browse and shop at the bustling Ben Thanh Market, known for its local crafts, textiles, and street food.',
            'Meals: Breakfast | Accommodation: Hotel in Saigon'
          ]
        },
        {
          title: 'DAY 03: SAIGON – MY THO (MEKONG DELTA) – SAIGON',
          paragraphs: [
            'After breakfast, travel by road to My Tho, about 65 km (approximately a 2-hour drive) from Saigon. My Tho serves as the gateway to the Mekong Delta, Vietnam\'s fertile "rice bowl."',
            'Upon arrival, embark on a boat trip along the Mekong River, cruising through narrow canals shaded by coconut palms.',
            'Stop at Unicorn Island to stroll through lush orchards, sample tropical fruits, and enjoy Southern Vietnamese folk music performed by local artists.',
            'Continue to Ben Tre Province, where you\'ll visit a coconut candy workshop to observe the traditional production process.',
            'Take a horse-drawn carriage ride through quiet village lanes and stop at a bee farm to taste fresh honey and honey tea.',
            'Return to My Tho pier and drive back to Saigon in the late afternoon. Evening at leisure. | Meals: Breakfast | Accommodation: Hotel in Saigon'
          ]
        },
        {
          title: 'DAY 04: SAIGON – DEPARTURE',
          paragraphs: [
            'Enjoy your morning at leisure for some last-minute shopping or relaxation until it\'s time to transfer to the airport for your departure flight.',
            'Meals: Breakfast'
          ]
        }
      ];
    }
    
    // Default Vietnam itinerary for other packages
    return [
      {
        title: 'Day 1: Arrival in Ho Chi Minh City',
        paragraphs: ['Arrive and transfer to hotel. Evening city orientation tour.']
      },
      {
        title: 'Day 2: Ho Chi Minh City - Cu Chi Tunnels',
        paragraphs: ['City tour and Cu Chi Tunnels excursion.']
      },
      {
        title: 'Day 3: Hoi An Ancient Town',
        paragraphs: ['Fly to Da Nang and transfer to Hoi An. Ancient town exploration.']
      },
      {
        title: 'Day 4: Hoi An to Hanoi',
        paragraphs: ['Fly to Hanoi. City tour including Old Quarter.']
      },
      {
        title: 'Day 5: Halong Bay Cruise',
        paragraphs: ['Full day Halong Bay cruise with cave visits.']
      },
      {
        title: 'Final Day: Departure',
        paragraphs: ['Transfer to airport for departure.']
      }
    ];
  }
  
  // Sri Lanka specific itinerary
  if (idNum >= 52 && idNum <= 54) {
    // 7-Day Sri Lanka Tour for fifth row (Dambulla-Kandy-Nuwara Eliya-Bentota-Colombo)
    return [
      {
        title: 'Day 1: Arrival – Dambulla',
        paragraphs: [
          'Arrive at Colombo Airport and meet your guide.',
          'Drive to Dambulla with a stop at Pinnawala Elephant Orphanage to see and feed elephants.',
          'Explore Dambulla Cave Temple, famous for its Buddha statues and ancient paintings.',
          'Visit Sigiriya Rock Fortress, climb the rock and admire its frescoes and gardens.',
          'Check in to your hotel in Dambulla.'
        ]
      },
      {
        title: 'Day 2: Dambulla – Kandy',
        paragraphs: [
          'Drive to Kandy, stopping at a Spice & Herbal Garden to learn about Sri Lanka\'s spices and their uses.',
          'Optional: Attend the Kandy Cultural Show in the evening.',
          'Overnight stay in Kandy.'
        ]
      },
      {
        title: 'Day 3: Kandy',
        paragraphs: [
          'Visit the Temple of the Sacred Tooth, a UNESCO World Heritage Site and spiritual center of Kandy.',
          'Explore the city at leisure.',
          'Overnight stay in Kandy.'
        ]
      },
      {
        title: 'Day 4: Kandy – Nuwara Eliya',
        paragraphs: [
          'Visit Sri Bhaktha Hanuman Temple and Ramboda Falls.',
          'Learn about tea cultivation and production at a tea plantation and factory.',
          'Stop at Seetha Amman Temple and enjoy the scenic beauty of Nuwara Eliya city, including Lake Gregory and Queen Victoria Park.',
          'Check into your hotel in Nuwara Eliya.'
        ]
      },
      {
        title: 'Day 5: Nuwara Eliya – Bentota',
        paragraphs: [
          'Visit Kosgoda Sea Turtle Conservation Project and witness turtle hatchlings.',
          'Enjoy a Madu River boat safari with mangroves, local villages, cinnamon cultivation, and birdwatching.',
          'Overnight stay in Bentota.'
        ]
      },
      {
        title: 'Day 6: Bentota – Colombo',
        paragraphs: [
          'Drive to Colombo for a city tour: Cinnamon Gardens, Fort area, Pettah Bazaar, Independence Square, and other landmarks.',
          'Evening shopping at Odel, Barefoot, Galle Face, and local markets.',
          'Overnight stay in Colombo.'
        ]
      },
      {
        title: 'Day 7: Colombo – Departure',
        paragraphs: [
          'Breakfast at the hotel.',
          'Transfer to Colombo Airport for your departure with wonderful memories of Sri Lanka.'
        ]
      }
    ];
  }
  if (idNum >= 49 && idNum <= 51) {
    // 6-Day Sri Lanka Tour for fourth and fifth row (Kandy-Bentota-Galle-Colombo)
    return [
      {
        title: 'Day 1: Arrival – Kandy',
        paragraphs: [
          'Arrive at Colombo Airport and meet your guide.',
          'Drive to Kandy with a stop at Pinnawala Elephant Orphanage to see and feed elephants.',
          'Visit a Spice & Herbal Garden and learn about Sri Lanka\'s aromatic spices and medicinal herbs.',
          'Explore the Temple of the Sacred Tooth in Kandy.',
          'Optional: Enjoy the Kandy Cultural Show in the evening. Overnight in Kandy.'
        ]
      },
      {
        title: 'Day 2: Kandy – Bentota',
        paragraphs: [
          'Breakfast at the hotel.',
          'Transfer to Bentota and check in.',
          'Relax at the hotel or explore nearby.',
          'Overnight in Bentota.'
        ]
      },
      {
        title: 'Day 3: Bentota',
        paragraphs: [
          'Visit Kosgoda Sea Turtle Conservation Project and witness hatchlings being released.',
          'Enjoy a scenic Madu River boat safari with mangroves, local villages, cinnamon cultivation, and birdwatching.',
          'Overnight in Bentota.'
        ]
      },
      {
        title: 'Day 4: Bentota – Galle',
        paragraphs: [
          'Breakfast at the hotel.',
          'Explore Galle Fort, stroll the streets, visit museums, cafes, and enjoy the coastal vibe.',
          'Overnight in Galle.'
        ]
      },
      {
        title: 'Day 5: Galle – Colombo',
        paragraphs: [
          'Breakfast at the hotel.',
          'City tour of Colombo: Fort area, Pettah Bazaar, Independence Square, Avukana Buddha replica, and shopping spots including Odel, Barefoot, and Galle Face.',
          'Overnight in Colombo.'
        ]
      },
      {
        title: 'Day 6: Colombo – Departure',
        paragraphs: [
          'Breakfast at the hotel.',
          'Transfer to Colombo Airport for your departure with wonderful memories of Sri Lanka.'
        ]
      }
    ];
  }
  if (idNum >= 46 && idNum <= 48) {
    // 6-Day Sri Lanka Tour for third row
    return [
      {
        title: 'Day 1: Arrival – Colombo to Kandy',
        paragraphs: [
          'Arrive at Colombo International Airport and meet your local guide. After airport formalities, transfer to Kandy.',
          'En route: Visit Pinnawala Elephant Orphanage, home to over 100 rescued elephants.',
          'Explore a Spice Garden to learn about Sri Lanka\'s famous spices and their traditional healing uses.',
          'In Kandy, visit the Temple of the Sacred Tooth Relic, a UNESCO World Heritage Site.',
          'Optional: Enjoy a traditional Kandyan Cultural Dance Show in the evening. Overnight stay in Kandy.'
        ]
      },
      {
        title: 'Day 2: Kandy – Nuwara Eliya',
        paragraphs: [
          'After breakfast, proceed to Nuwara Eliya.',
          'Visit Sri Bhaktha Hanuman Temple and see the legendary \'Sita Tear Pond\'.',
          'Tour a Tea Plantation and Factory to discover how world-famous Ceylon Tea is made, followed by a tasting session.',
          'Visit the Seetha Amman Temple, believed to mark the spot where Sita was held captive.',
          'Later, explore Nuwara Eliya, the charming hill town known as "Little England." Overnight stay in Nuwara Eliya.'
        ]
      },
      {
        title: 'Day 3: Nuwara Eliya – Bentota',
        paragraphs: [
          'After breakfast, travel to the coastal town of Bentota.',
          'Check in at your hotel and relax by the beach.',
          'Overnight stay in Bentota.'
        ]
      },
      {
        title: 'Day 4: Bentota',
        paragraphs: [
          'After breakfast, visit the Kosgoda Turtle Conservation Project to learn about sea turtle protection and witness baby turtles being released into the sea.',
          'Then enjoy a boat safari on the Madu River, gliding through mangrove islands, spotting wildlife, and visiting a riverside temple.',
          'Return to the hotel for leisure. Overnight stay in Bentota.'
        ]
      },
      {
        title: 'Day 5: Bentota – Colombo',
        paragraphs: [
          'After breakfast, drive to Colombo for a city tour.',
          'Explore key attractions including Fort, Pettah Bazaar, Independence Square, and Galle Face Green.',
          'Later, enjoy shopping at popular malls and boutiques such as Odel, House of Fashion, and One Galle Face.',
          'Overnight stay in Colombo.'
        ]
      },
      {
        title: 'Day 6: Colombo – Departure',
        paragraphs: [
          'After breakfast, transfer to Colombo International Airport for your flight home, carrying wonderful memories of Sri Lanka.'
        ]
      }
    ];
  }
  if (idNum >= 40 && idNum <= 45) {
    // 5-Day Sri Lanka Tour for first two rows
    return [
      {
        title: 'Day 1: Arrival – Pinnawala – Kandy',
        paragraphs: [
          'Meet your guide at Colombo International Airport and transfer to Kandy.',
          'En route, visit the Pinnawala Elephant Orphanage to see elephants being fed and bathed.',
          'Stop by a Spice & Herbal Garden to learn about Sri Lanka\'s famous spices and Ayurveda.',
          'In Kandy, visit the Temple of the Sacred Tooth Relic, a UNESCO World Heritage Site.',
          'Optional: Enjoy the Kandy Cultural Show in the evening. Overnight stay in Kandy.'
        ]
      },
      {
        title: 'Day 2: Kandy – Ramboda – Nuwara Eliya',
        paragraphs: [
          'After breakfast, proceed to Nuwara Eliya.',
          'Visit the Sri Bhaktha Hanuman Temple and Ramboda Falls.',
          'Tour a Tea Factory and Plantation to see how Ceylon Tea is made and enjoy a tasting session.',
          'Visit the Seetha Amman Temple, linked to the Ramayana legend.',
          'Explore Nuwara Eliya City, including Gregory Lake and Victoria Park. Overnight stay in Nuwara Eliya.'
        ]
      },
      {
        title: 'Day 3: Nuwara Eliya – Yala',
        paragraphs: [
          'Breakfast at the hotel.',
          'Drive to Yala National Park.',
          'Enjoy an afternoon jeep safari through the park—home to elephants, leopards, and many bird species.',
          'Overnight stay near Yala.'
        ]
      },
      {
        title: 'Day 4: Yala – Colombo',
        paragraphs: [
          'After breakfast, head to Colombo.',
          'Enjoy a city tour covering major landmarks such as Fort, Pettah Market, Galle Face Green, Independence Square, and BMICH.',
          'Spend the evening shopping at top stores like Odel, House of Fashion, and Colombo City Centre.',
          'Overnight stay in Colombo.'
        ]
      },
      {
        title: 'Day 5: Colombo – Departure',
        paragraphs: [
          'Breakfast at the hotel.',
          'Transfer to Colombo International Airport for your onward flight.',
          'End of tour with fond memories of Sri Lanka.'
        ]
      }
    ];
  }
  
  const commonDay1 = {
    title: 'Day 1: Arrival | Hotel Transfer | Dhow Cruise Dinner',
    paragraphs: [
      `Welcome to ${city}! Upon arrival at the airport, our representative will assist with a smooth transfer to the hotel.`,
      'Check-in and relax after your journey and soak in the first glimpses of this amazing city.',
      'Evening Dhow Cruise: Enjoy a buffet dinner, live entertainment, and stunning night views of the skyline.'
    ]
  };
  const day2 = {
    title: 'Day 2: Half-Day City Tour | Burj Khalifa (124th – Non-Prime)',
    paragraphs: [
      `Explore the city’s blend of heritage and modernity: Jumeirah Mosque, Burj Al Arab, Palm Jumeirah, Atlantis photo stop, and Al Fahidi district.`,
      'Afternoon free at leisure for shopping or relaxation.',
      'Evening visit to Burj Khalifa with mesmerizing Fountain Show.'
    ]
  };
  const day3 = {
    title: 'Day 3: Desert Safari Adventure with BBQ Dinner',
    paragraphs: [
      'Morning at leisure.',
      'Afternoon dune bashing, sandboarding, camel rides, and a BBQ dinner with live shows under the stars.'
    ]
  };
  const miracleVillage = {
    title: 'Day 4: Dubai Miracle Garden | Global Village',
    paragraphs: [
      'Stroll through Miracle Garden’s spectacular floral displays.',
      'Experience Global Village’s pavilions, cuisines, shopping and live performances.'
    ]
  };
  const abuDhabi = {
    title: 'Day 5: Abu Dhabi City Tour',
    paragraphs: [
      'Visit Sheikh Zayed Grand Mosque, drive along the Corniche, photo stop at Emirates Palace and Ferrari World (outside view).'
    ]
  };

  if ([1,4,7].includes(idNum)) {
    return [commonDay1, day2, day3, {title:'Day 4: Departure', paragraphs:['Breakfast at hotel. Check-out & transfer to airport for your onward journey.']}];
  }
  if ([2,5,8].includes(idNum)) {
    return [commonDay1, day2, day3, miracleVillage, {title:'Day 5: Departure', paragraphs:['Breakfast at hotel. Check-out & transfer to airport for your onward journey.']}];
  }
  if ([3,6,9].includes(idNum)) {
    return [commonDay1, day2, day3, miracleVillage, abuDhabi, {title:'Day 6: Departure', paragraphs:['Breakfast at hotel. Check-out & transfer to airport for your onward journey.']}];
  }
  // Generic for other destinations (4-day template)
  return [
    { title: 'Day 1: Arrival', paragraphs:[`Welcome to ${city}! Airport transfer to hotel and check-in. Evening at leisure.`] },
    { title: 'Day 2: Sightseeing', paragraphs:['Full day city tour and cultural experiences with professional guide.'] },
    { title: 'Day 3: Activities', paragraphs:['Adventure activities, shopping, and local experiences.'] },
    { title: 'Final Day: Departure', paragraphs:['Check-out and transfer to airport for departure.'] },
  ];
}

function getInclusions(id){
  const idNum = Number(id);
  const base = [
    'Accommodation with daily breakfast',
    'Airport transfers (arrival & departure)',
    'City tour with professional guide',
    'All transfers in private AC vehicle',
  ];
  if (idNum>=58 && idNum<=69){
    return [
      'Accommodation as per package duration',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Domestic flights (Ho Chi Minh - Hanoi)',
      'Ho Chi Minh City tour with Reunification Palace',
      'Cu Chi Tunnels underground experience',
      'Hanoi city tour with Ho Chi Minh Mausoleum',
      'Halong Bay cruise with cave visits',
      'Hoi An ancient town exploration',
      'Traditional water puppet show',
      'Vietnamese cooking class experience',
      'All transfers in private AC vehicle',
      'Professional English-speaking guide',
    ];
  }
  if (idNum>=40 && idNum<=57){
    return [
      '4 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Pinnawala Elephant Orphanage visit',
      'Spice & Herbal Garden tour',
      'Temple of the Sacred Tooth Relic visit',
      'Sri Bhaktha Hanuman Temple & Ramboda Falls',
      'Tea Factory & Plantation tour with tasting',
      'Seetha Amman Temple visit',
      'Yala National Park jeep safari',
      'Colombo city tour with major landmarks',
      'All transfers in private AC vehicle',
      'Professional English-speaking guide',
    ];
  }
  if (idNum>=1 && idNum<=10){
    return [
      '3/4/5 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Dubai City Tour with professional guide',
      'Burj Khalifa 124th floor entry tickets',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise with dinner',
      'All transfers in private AC vehicle',
    ];
  }
  return base;
}

function getExclusions(){
  return [
    'International airfare',
    'Visa charges (if applicable)',
    'Travel insurance',
    'Personal expenses and tips',
    'Meals not mentioned in inclusions',
  ];
}

function getHotels(id, destination){
  const idNum = Number(id);
  if (idNum>=70 && idNum<=84){
    return [
      'Vientiane: 3-4 star hotel in city center',
      'Luang Prabang: Boutique hotel near UNESCO sites',
      'Vang Vieng: Riverside resort with mountain views',
      'Pakse: Comfortable hotel near Champasak ruins',
    ];
  }
  if (idNum>=58 && idNum<=69){
    return [
      'Vientiane: 3-4 star hotel in city center',
      'Luang Prabang: Boutique hotel near UNESCO sites',
      'Vang Vieng: Riverside resort with mountain views',
      'Pakse: Comfortable hotel near Champasak ruins',
    ];
  }
  if (idNum>=58 && idNum<=69){
    const starLevel = idNum <= 60 ? (idNum === 58 ? '3-star' : idNum === 59 ? '4-star' : '5-star') :
      idNum <= 63 ? (idNum === 61 ? '3-star' : idNum === 62 ? '4-star' : '5-star') :
      idNum <= 66 ? (idNum === 64 ? '3-star' : idNum === 65 ? '4-star' : '5-star') :
      (idNum === 67 ? '3-star' : idNum === 68 ? '4-star' : '5-star');
    return [
      `Ho Chi Minh City: ${starLevel} hotel in District 1`,
      `Hanoi: ${starLevel} hotel in Old Quarter area`,
      `Halong Bay: ${starLevel} cruise boat accommodation`,
      `Hoi An: ${starLevel} boutique hotel in Ancient Town`,
    ];
  }
  if (idNum>=40 && idNum<=57){
    const starLevel = idNum <= 42 ? (idNum === 40 ? '3-star' : idNum === 41 ? '4-star' : '5-star') : '4-star';
    return [
      `Kandy: ${starLevel} hotel with mountain views`,
      `Nuwara Eliya: ${starLevel} colonial-style hotel`,
      `Yala: ${starLevel} safari lodge near national park`,
      `Colombo: ${starLevel} city hotel with modern amenities`,
    ];
  }
  if (idNum>=1 && idNum<=10){
    return [
      'Ramada by Wyndham Dubai Deira or similar',
      'Citymax Hotel Bur Dubai or similar',
      'Golden Tulip Al Barsha or similar',
    ];
  }
  return [
    `${destination.split(',')[0]} 3-star or similar`,
    `${destination.split(',')[0]} 4-star or similar`,
    `${destination.split(',')[0]} 5-star or similar`,
  ];
}
