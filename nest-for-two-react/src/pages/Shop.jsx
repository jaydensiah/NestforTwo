import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // Category display names
  const categoryNames = {
    'signature-bottle': 'Signature Bottle Series',
    'signature-gift': 'Signature Gift Set Series',
    'premium-dried': 'Premium Dried Series',
    'kue-lapis': 'Traditional Kue Lapis Series',
  };

  return (
    <div className="min-h-screen bg-wellness-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair-bold text-4xl text-wellness-dark mb-4">
          Shop
        </h1>
        {category && categoryNames[category] && (
          <p className="text-wellness-text font-source-sans text-lg mb-8">
            Showing: <span className="text-wellness-rose font-bold">{categoryNames[category]}</span>
          </p>
        )}
        {!category && (
          <p className="text-wellness-text font-source-sans text-lg mb-8">
            Showing all products
          </p>
        )}

        {/* Placeholder for products grid */}
        <div className="text-wellness-text font-source-sans">
          <p>Shop page content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
