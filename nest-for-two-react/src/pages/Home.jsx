import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';
import BenefitsCarousel from '../components/home/BenefitsCarousel';

const Home = () => {
  useEffect(() => {
    document.title = "Nest for Two - Home";
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Welcome Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair-bold text-[30px] mb-6 text-wellness-dark">
            Singapore's Thickest, Freshest Bird's Nest
          </h1>
          <p className="font-source-sans text-wellness-text text-base max-w-4xl mx-auto mb-12">
            At Nest for Two, every bottle is brimming with generous strands of premium bird's nest, never watered down. We prepare each order only on the day of delivery, ensuring unmatched freshness and quality. No pre-made stock, no shortcuts, just the purest bird's nest at its peak, one of the most sought-after delicacies for its remarkable health benefits.
          </p>
          <BenefitsCarousel />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair-bold text-3xl text-center mb-4 text-wellness-dark">
            OUR BEST SELLERS
          </h2>

          {/* Decorative line */}
          <div className="flex justify-center mb-8">
            <div className="w-24 border-t-2" style={{ borderColor: '#B76E79' }}></div>
          </div>

          {/* Description */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-source-sans text-sm sm:text-base text-wellness-text">
              Our signature bottle series, available in Honey, Zero Sugar, and Rock Sugar variants.
            </p>
          </div>

          <ProductGrid category="freshly-cooked" />

          {/* View All Products Link */}
          <div className="flex justify-center mt-10">
            <Link
              to="/shop"
              className="font-playfair-bold text-[22px] flex items-center transition-colors duration-200 text-[#636260] hover:text-wellness-rose"
            >
              *View All Products
              <span className="inline-flex items-center ml-1">
                <span className="w-8 h-[1.5px] bg-current"></span>
                <span className="-ml-0.5 -mt-[3px]">›</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair-bold text-3xl text-center mb-12 text-wellness-dark">
            Hear from our happy customers
          </h2>
          <ReviewCarousel />
        </div>
      </section>

    </div>
  );
};

export default Home;
