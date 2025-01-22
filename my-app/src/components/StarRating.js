import React from 'react';

const StarRating = ({ rating }) => {
  const filledStars = '★'.repeat(Math.floor(rating));
  const emptyStars = '☆'.repeat(5 - Math.floor(rating));

  return (
    <span>
      {filledStars}
      {emptyStars}
    </span>
  );
};

export default StarRating;
