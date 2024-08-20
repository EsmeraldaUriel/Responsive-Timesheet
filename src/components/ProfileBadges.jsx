import React from 'react';

const ProfileBadges = ({ badgeOne, badgeTwo, badgeThree }) => {
  const placeholderBadge = 'https://via.placeholder.com/90'; // Placeholder image

  return (
    <div className="bg-[#dbedff] rounded-lg shadow-md w-[600px] h-[170px] p-5">
      <h2 className="text-2xl font-medium mb-2">Badges</h2>
      <div className="flex gap-4 px-1 pt-1">
        <img src={badgeOne || placeholderBadge} alt="Badge 1" className="h-[90px] w-[90px]" />
        <img src={badgeTwo || placeholderBadge} alt="Badge 2" className="h-[90px] w-[90px]" />
        <img src={badgeThree || placeholderBadge} alt="Badge 3" className="h-[90px] w-[90px]" />
      </div>
    </div>
  );
};

export default ProfileBadges;
