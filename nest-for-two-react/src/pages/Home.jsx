import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';
import ProductCard from '../components/product/ProductCard';
import BenefitsCarousel from '../components/home/BenefitsCarousel';
import { getKueLapisProducts } from '../config/products';

const Home = () => {
  const kueLapisProducts = getKueLapisProducts();

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
            Signature Bottle Series
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

      {/* Latest Additions (Kue Lapis) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair-bold text-3xl text-center mb-12 text-wellness-dark">
            Latest Additions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kueLapisProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
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

      {/* CTA Section */}
      <section className="py-16 bg-wellness-rose">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair-bold text-3xl text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="font-source-sans text-white text-lg mb-8 opacity-90">
            Join thousands of satisfied customers enjoying Singapore's thickest, freshest bird's nest
          </p>
          <Link
            to="/products/honey"
            className="inline-block bg-white text-wellness-rose px-8 py-3 font-nunito-regular font-semibold hover:bg-wellness-cream transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
