import React from 'react';

const AnnouncementBar = ({ message = "FREE DELIVERY for orders above $120" }) => {
  return (
    <div className="h-10 flex items-center justify-center" style={{ backgroundColor: '#d8cdcb' }}>
      <p className="text-wellness-dark text-sm font-source-sans tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default AnnouncementBar;
