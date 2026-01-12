const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Image */}
      <div className="w-full max-h-96 overflow-hidden">
        <img
          src="/images/HeroAbout.png"
          alt="About Nest for Two"
          className="w-full h-full object-cover"
          style={{ maxHeight: '400px' }}
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center text-wellness-dark">
          Our Story
        </h1>

        <div className="font-source-sans text-wellness-text space-y-6 text-base leading-relaxed">
          <p>
            Nest for Two was born from a simple belief: that wellness should be both accessible and authentic.
            In a world of mass-produced supplements and questionable health claims, we wanted to offer something
            different - something real, traditional, and truly beneficial.
          </p>

          <p>
            Our journey began with a deep appreciation for the ancient wisdom of bird's nest consumption.
            For centuries, bird's nest has been treasured across Asia for its remarkable health benefits,
            from skin rejuvenation to immune support. We wanted to bring this time-honored tradition to
            modern Singapore families in the most convenient, fresh, and highest-quality form possible.
          </p>

          <p>
            What sets Nest for Two apart is our unwavering commitment to freshness and quality. While many
            brands rely on preservatives and mass production, we prepare our bird's nest fresh to order.
            This means you receive the thickest, most nutrient-rich bird's nest possible - exactly as nature
            intended.
          </p>

          <p>
            We're particularly proud of our three carefully crafted varieties: our Honey Sachet, perfect for
            children with its natural sweetness; our Rock Sugar option, beloved by the elderly for its
            traditional taste; and our Zero Sugar variant, specially designed for pregnant mothers and those
            managing diabetes.
          </p>

          <p>
            Every bottle is prepared with meticulous care in our Singapore facility, using only premium
            Indonesian bird's nest. We believe in transparency - what you see is what you get. No hidden
            ingredients, no artificial additives, just pure, thick, authentic bird's nest.
          </p>

          <p>
            Our subscription service was designed with busy Singaporeans in mind. We know that maintaining
            a wellness routine can be challenging, which is why we deliver fresh bird's nest right to your
            door every week. It's wellness made simple, so you can focus on what matters most - your health
            and your family.
          </p>

          <p>
            Today, Nest for Two is proud to serve thousands of families across Singapore. Whether you're
            seeking better skin, stronger immunity, or simply a moment of wellness in your busy day, we're
            here to support your journey with the finest bird's nest Singapore has to offer.
          </p>

          <p className="font-semibold text-wellness-dark pt-4">
            Thank you for choosing Nest for Two. Here's to your health and happiness.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-wellness-cream py-16 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair-bold text-3xl text-center mb-12 text-wellness-dark">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-playfair-bold text-xl mb-3 text-wellness-dark">
                Quality First
              </h3>
              <p className="font-source-sans text-wellness-text">
                We use only premium Indonesian bird's nest, prepared fresh to order with no preservatives
                or artificial additives.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-playfair-bold text-xl mb-3 text-wellness-dark">
                Authenticity
              </h3>
              <p className="font-source-sans text-wellness-text">
                Our bird's nest is authentically prepared using traditional methods, delivering the
                thickness and quality our customers deserve.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-playfair-bold text-xl mb-3 text-wellness-dark">
                Customer Care
              </h3>
              <p className="font-source-sans text-wellness-text">
                From flexible delivery options to personalized service, we're committed to making your
                wellness journey as convenient as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
