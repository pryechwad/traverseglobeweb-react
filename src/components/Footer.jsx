import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white py-8 mt-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-orange font-season">Traverse Globe</h3>
            <p className="text-white/70 font-canva-sans leading-relaxed">
              Your trusted travel partner for unforgettable journeys across the world. 
              We specialize in creating unique travel experiences that you'll cherish forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 font-poppins">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 font-poppins">Contact Us</h4>
            <ul className="space-y-2 text-white/70 font-canva-sans">
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-orange"></i>
                <span>+91 9997085457</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-orange"></i>
                <span>mail@traverseglobe.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3 text-orange"></i>
                <span>Delhi, India</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-white/70 hover:text-orange transition-colors text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-white/70 hover:text-orange transition-colors text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-white/70 hover:text-orange transition-colors text-xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/70 hover:text-orange transition-colors text-xl">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
  <div className="border-t border-white/20 mt-6 pt-6 text-center text-white/70 font-canva-sans">
          <p>
            &copy; {new Date().getFullYear()} TraverseGlobe. All rights reserved. | Crafted with ❤️ for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


