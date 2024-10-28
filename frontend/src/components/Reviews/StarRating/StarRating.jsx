import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import './StarRating.css'; // Assuming you'll create a CSS file for styles

export default function StarRating({ setStars }) { // Accept setStars as a prop
  const [rating, setRating] = useState(0); // Initialize rating to 0

  // Update the window rating and also notify the parent component
  useEffect(() => {
    setStars(rating); // Call the parent's setStars function whenever rating changes
    window.rating = rating; // Update the window object for other potential uses
  }, [rating, setStars]);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return (
          <div key={index}>
            <input
              type="radio"
              name="rate"
              id={`star-${currentRate}`}
              value={currentRate}
              onClick={() => setRating(currentRate)}
              style={{ display: 'none' }} // Hide the radio button
            />
            <label htmlFor={`star-${currentRate}`}>
              <FaStar
                color={currentRate <= rating ? "gold" : "grey"}
                style={{ cursor: 'pointer' }} // Change cursor to pointer
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}
