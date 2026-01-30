const About = () => {
  return (
    <div className="pt-10">
      {/* About Us Header */}
      <h1
        className="font-playfair-bold text-3xl md:text-4xl text-center pt-2 pb-11"
        style={{ color: '#636260' }}
      >
        About Us
      </h1>

      {/* Content Section - Text Left (2/7), Image Right (5/7) */}
      <div className="flex flex-col md:flex-row items-stretch mb-11 px-6 md:px-8 lg:px-12">
        {/* Left Text Section - 2/7 width */}
        <div
          className="w-full pr-6 md:pr-8 py-8 md:py-12 flex flex-col justify-center"
          style={{ flex: '0 0 28.57%' }}
        >
          <h2
            className="font-source-sans font-bold text-sm md:text-base tracking-wide mb-4 md:mb-6"
            style={{ color: '#636260' }}
          >
            NEST FOR TWO
          </h2>

          <p
            className="font-source-sans text-sm md:text-base leading-relaxed mb-4"
            style={{ color: '#636260' }}
          >
            In a world where bird’s nest is mass produced and packaged to sit on shelves, Jem and San chose to return to how it was meant to be enjoyed.
          </p>

          <p
            className="font-source-sans text-sm md:text-base leading-relaxed"
            style={{ color: '#636260' }}
          >
            What began as two friends sharing bird’s nest fresh from the pot led to the creation of a brand rooted in the belief that this delicacy should be consumed at its peak. Prepared only when ordered and enjoyed on the same day.
          </p>
        </div>

        {/* Right Image Section - 5/7 width */}
        <div className="w-full" style={{ flex: '0 0 71.43%' }}>
          <img
            src="/images/HeroAbout.png"
            alt="About Nest for Two"
            className="w-full h-full object-cover"
            style={{ minHeight: '400px', maxHeight: '600px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
