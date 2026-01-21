import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';
import BenefitsCarousel from '../components/home/BenefitsCarousel';

const Home = () => {

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
          <p className="font-source-sans text-wellness-text text-base max-w-3xl mx-auto mb-12">
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
              Our premium freshly cooked bird's nest sachets, available in honey, rock sugar, and zero sugar variants.
            </p>
          </div>

          <ProductGrid category="freshly-cooked" />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-wellness-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair-bold text-3xl text-center mb-12 text-wellness-dark">
            What Our Customers Say
          </h2>
          <ReviewCarousel />
        </div>
      </section>

    </div>
  );
};

export default Home;
