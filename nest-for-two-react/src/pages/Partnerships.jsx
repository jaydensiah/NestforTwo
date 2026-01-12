const Partnerships = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-wellness-cream min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center text-wellness-dark">
          Collaborations & Partnerships
        </h1>

        {/* Hero Image */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/images/Collaborations.png"
            alt="Collaborations"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="font-source-sans text-wellness-text space-y-6">
            <p className="text-lg">
              We're always looking for exciting partnership opportunities to bring the benefits of
              premium bird's nest to more people across Singapore and beyond.
            </p>

            <h2 className="font-playfair-bold text-2xl text-wellness-dark pt-6">
              Corporate Wellness Programs
            </h2>
            <p>
              Partner with us to offer your employees a unique wellness benefit. Our corporate
              packages are designed to support employee health and wellbeing through regular
              bird's nest delivery. Perfect for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Employee wellness programs</li>
              <li>Corporate gifts and hampers</li>
              <li>Health and wellness initiatives</li>
              <li>Team appreciation gifts</li>
            </ul>

            <h2 className="font-playfair-bold text-2xl text-wellness-dark pt-6">
              Retail & Distribution
            </h2>
            <p>
              Interested in stocking Nest for Two products in your retail location? We work with
              premium retailers, wellness centers, and specialty stores who share our commitment
              to quality and authenticity. Our products are perfect for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Organic and health food stores</li>
              <li>Premium supermarkets</li>
              <li>Wellness and spa centers</li>
              <li>Traditional Chinese medicine shops</li>
            </ul>

            <h2 className="font-playfair-bold text-2xl text-wellness-dark pt-6">
              Content Creators & Influencers
            </h2>
            <p>
              If you're passionate about wellness, traditional health foods, or lifestyle content,
              we'd love to collaborate with you. We work with content creators who:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Share authentic product experiences</li>
              <li>Create engaging, educational content</li>
              <li>Have an audience interested in wellness and health</li>
              <li>Align with our brand values of quality and authenticity</li>
            </ul>

            <h2 className="font-playfair-bold text-2xl text-wellness-dark pt-6">
              Event Collaborations
            </h2>
            <p>
              We participate in wellness events, health fairs, and community gatherings throughout
              Singapore. If you're organizing an event focused on health, wellness, or lifestyle,
              we'd love to be part of it.
            </p>

            <h2 className="font-playfair-bold text-2xl text-wellness-dark pt-6">
              Custom Partnerships
            </h2>
            <p>
              Have a unique collaboration idea? We're open to creative partnerships that align
              with our mission of making premium bird's nest accessible to everyone. Whether it's
              a co-branded product, special event, or innovative distribution model, we'd love to
              hear from you.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-wellness-rose text-white p-8 rounded-lg shadow-md text-center">
          <h2 className="font-playfair-bold text-3xl mb-4">
            Let's Work Together
          </h2>
          <p className="font-source-sans text-lg mb-6 opacity-90">
            Interested in partnering with Nest for Two? We'd love to explore how we can collaborate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-wellness-rose px-8 py-3 font-nunito-regular font-semibold hover:bg-wellness-cream transition-colors rounded"
            >
              Contact Us
            </a>
            <a
              href="mailto:partnerships@nestfortwo.com"
              className="inline-block border-2 border-white text-white px-8 py-3 font-nunito-regular font-semibold hover:bg-white hover:text-wellness-rose transition-colors rounded"
            >
              Email Partnerships Team
            </a>
          </div>
        </div>

        {/* Current Partners Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-playfair-bold text-2xl text-center mb-6 text-wellness-dark">
            Our Current Partners
          </h2>
          <p className="font-source-sans text-wellness-text text-center mb-8">
            We're proud to work with leading organizations in wellness, retail, and healthcare
            across Singapore. Join our growing network of partners committed to quality and wellness.
          </p>
          <div className="text-center">
            <p className="font-source-sans text-wellness-text italic">
              Partner logos and testimonials coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
