import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-lightGray">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="transition-transform hover:scale-105" aria-label="Traverse Globe Home">
            <picture>
              <source srcSet="/logo.png" type="image/png" />
              <img
                src="/logo.png"
                alt="Traverse Globe"
                className="h-12 md:h-14 object-contain"
                width="176"
                height="70"
                decoding="async"
              />
            </picture>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-darkBlue focus:outline-none hover:text-orange transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <Link 
                to="/" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Services
              </Link>
            </li>
            <li className="relative group">
              <span 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all group-hover:after:w-full"
              >
                Packages
              </span>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute top-full left-0 mt-2 bg-white shadow-xl rounded-xl p-2 min-w-[180px] border border-lightGray">
                <Link to="/uae-packages" className="block px-3 py-2 rounded-lg hover:bg-lightGray hover:text-orange transition-colors font-canva-sans text-sm" >UAE</Link>
                <Link to="/bali-packages" className="block px-3 py-2 rounded-lg hover:bg-lightGray hover:text-orange transition-colors font-canva-sans text-sm" >Bali</Link>
                <Link to="/thailand-packages" className="block px-3 py-2 rounded-lg hover:bg-lightGray hover:text-orange transition-colors font-canva-sans text-sm" >Thailand</Link>
                <Link to="/singapore-packages" className="block px-3 py-2 rounded-lg hover:bg-lightGray hover:text-orange transition-colors font-canva-sans text-sm" >Singapore</Link>
              </div>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="bg-orange text-white px-4 py-1.5 text-sm rounded-full font-poppins font-semibold hover:bg-teal transition-all hover:shadow-md"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul id="mobile-nav" className="lg:hidden pb-4 space-y-3" role="menu">
            <li>
              <Link 
                to="/" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <div className="block text-darkBlue font-poppins font-medium py-2">Packages</div>
              <ul className="pl-4 space-y-1">
                <li>
                  <Link to="/uae-packages" className="block text-darkBlue/70 hover:text-orange py-1 font-canva-sans" onClick={() => setIsOpen(false)}>UAE</Link>
                </li>
                <li>
                  <Link to="/bali-packages" className="block text-darkBlue/70 hover:text-orange py-1 font-canva-sans" onClick={() => setIsOpen(false)}>Bali</Link>
                </li>
                <li>
                  <Link to="/thailand-packages" className="block text-darkBlue/70 hover:text-orange py-1 font-canva-sans" onClick={() => setIsOpen(false)}>Thailand</Link>
                </li>
                <li>
                  <Link to="/singapore-packages" className="block text-darkBlue/70 hover:text-orange py-1 font-canva-sans" onClick={() => setIsOpen(false)}>Singapore</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block bg-orange text-white px-4 py-2 rounded-full font-poppins font-semibold text-center hover:bg-teal transition-all"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
