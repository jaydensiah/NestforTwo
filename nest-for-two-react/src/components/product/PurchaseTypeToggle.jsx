import React from 'react';

/**
 * PurchaseTypeToggle Component
 * Displays the one-time purchase type as the sole option
 */
const PurchaseTypeToggle = () => {
  return (
    <div className="border border-[#d1d5db] p-1 w-full flex">
      <div
        className="w-full py-2 font-source-sans text-[12px] sm:text-sm bg-wellness-rose text-white text-center"
      >
        One-time Purchase
      </div>
    </div>
  );
};

export default PurchaseTypeToggle;
