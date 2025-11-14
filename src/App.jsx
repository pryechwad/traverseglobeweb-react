import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import PerformanceMonitor from './components/PerformanceMonitor';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const UAEPackages = lazy(() => import('./pages/UAEPackages'));
const BaliPackages = lazy(() => import('./pages/BaliPackages'));
const ThailandPackages = lazy(() => import('./pages/ThailandPackages'));
const SingaporePackages = lazy(() => import('./pages/SingaporePackages'));
const SriLankaPackages = lazy(() => import('./pages/SriLankaPackages'));
const VietnamPackages = lazy(() => import('./pages/VietnamPackages'));
const LaosPackages = lazy(() => import('./pages/LaosPackages'));
const AndamanPackages = lazy(() => import('./pages/AndamanPackages'));
const JaipurPackages = lazy(() => import('./pages/JaipurPackages'));
const KeralaPackages = lazy(() => import('./pages/KeralaPackages'));
const KashmirPackages = lazy(() => import('./pages/KashmirPackages'));
const BhutanPackages = lazy(() => import('./pages/BhutanPackages'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const PackageRedirect = lazy(() => import('./pages/PackageRedirect'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PerformanceMonitor />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main>
          <Suspense fallback={
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mb-4"></div>
                <p className="text-darkBlue/80 font-poppins">Loading...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/uae-packages" element={<UAEPackages />} />
              <Route path="/uae-packages/:slug" element={<PackageDetails />} />
              <Route path="/bali-packages" element={<BaliPackages />} />
              <Route path="/bali-packages/:slug" element={<PackageDetails />} />
              <Route path="/thailand-packages" element={<ThailandPackages />} />
              <Route path="/thailand-packages/:slug" element={<PackageDetails />} />
              <Route path="/singapore-packages" element={<SingaporePackages />} />
              <Route path="/singapore-packages/:slug" element={<PackageDetails />} />
              <Route path="/srilanka-packages" element={<SriLankaPackages />} />
              <Route path="/srilanka-packages/:slug" element={<PackageDetails />} />
              <Route path="/vietnam-packages" element={<VietnamPackages />} />
              <Route path="/vietnam-packages/:slug" element={<PackageDetails />} />
              <Route path="/laos-packages" element={<LaosPackages />} />
              <Route path="/laos-packages/:slug" element={<PackageDetails />} />
              <Route path="/andaman-packages" element={<AndamanPackages />} />
              <Route path="/andaman-packages/:slug" element={<PackageDetails />} />
              <Route path="/jaipur-packages" element={<JaipurPackages />} />
              <Route path="/jaipur-packages/:slug" element={<PackageDetails />} />
              <Route path="/kerala-packages" element={<KeralaPackages />} />
              <Route path="/kerala-packages/:slug" element={<PackageDetails />} />
              <Route path="/kashmir-packages" element={<KashmirPackages />} />
              <Route path="/kashmir-packages/:slug" element={<PackageDetails />} />
              <Route path="/bhutan-packages" element={<BhutanPackages />} />
              <Route path="/bhutan-packages/:slug" element={<PackageDetails />} />
              {/* Backward compatibility: redirect old slug URLs to nested category path */}
              <Route path="/package/:slug" element={<PackageRedirect />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
