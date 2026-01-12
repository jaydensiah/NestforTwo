import React from 'react';

const AnnouncementBar = ({ message = "FREE DELIVERY for orders above $120" }) => {
  return (
    <div className="h-10 bg-custom-announcementBar flex items-center justify-center">
      <p className="text-wellness-dark text-sm font-nunito-regular tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default AnnouncementBar;
