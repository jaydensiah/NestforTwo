import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="w-full bg-wellness-cream">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {/* 16:9 aspect ratio container */}
        <div className="absolute inset-0">
          <img
            src="/images/Main.png"
            alt="Bird's Nest Collection"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Shop Now Button - Positioned in left white space */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 sm:left-12 md:left-16 lg:left-20">
            <Link to="/products">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
