import { kashmirPackages } from '../data/siteData';
import PackageCard from '../components/PackageCard';
import ToursPackagesBanner from '../components/ToursPackagesBanner';

const KashmirPackages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToursPackagesBanner 
        title="Kashmir Packages"
        subtitle="Discover the Paradise on Earth with stunning valleys and snow-capped mountains"
        backgroundImage="https://images.unsplash.com/photo-1605649487212-47b9f5c1e813?auto=format&fit=crop&w=1920&q=80"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBlue mb-4">
            Kashmir Tour Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the breathtaking beauty of Kashmir with our exclusive packages. 
            From Dal Lake houseboats to Gulmarg's snow-covered peaks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kashmirPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              nights={pkg.nights}
              strikePrice={pkg.strikePrice}
              price={pkg.price}
              image={pkg.image}
              category="kashmir-packages"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KashmirPackages;