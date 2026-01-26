import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full bg-wellness-cream">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {/* 16:9 aspect ratio container */}
        <div className="absolute inset-0">
          <img
            src="/images/HeroPlain.png"
            alt="Bird's Nest Collection"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Text and Button Overlay */}
          <div className="absolute inset-0 flex items-center -mt-8 sm:-mt-10 md:-mt-12">
            <div className="px-4 sm:px-12 md:px-16 lg:px-20 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-2xl">
              {/* Header */}
              <h1 className="font-playfair-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 md:mb-6" style={{ color: '#704c46' }}>
                Premium Bird's Nest
              </h1>

              {/* Body Paragraph */}
              <p className="font-source-sans text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed" style={{ color: '#704c46' }}>
                Experience fresh, made-to-order bird's nest sourced from Indonesia. Pure, nourishing, and delicious.
              </p>

              {/* Shop Now Button */}
              <Link to="/products">
                <button
                  className="font-source-sans font-bold text-white px-5 py-2 sm:px-8 sm:py-3 text-xs sm:text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: '#B76E79' }}
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
