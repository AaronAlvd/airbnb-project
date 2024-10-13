import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import './StarRating.css'; // Assuming you'll create a CSS file for styles


export default function StarRating() {
  const [rating, setRating] = useState(null);
 useEffect(()=>{
    window.rating = rating
 },[rating])
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
                color={currentRate <= rating ? "yellow" : "grey"}
                style={{ cursor: 'pointer' }} // Change cursor to pointer
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}
