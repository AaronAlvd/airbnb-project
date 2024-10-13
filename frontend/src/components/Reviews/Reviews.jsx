import { useState } from "react";
import ReviewForm from "./ReviewForm";
export default function Reviews(props) {
    const spot = props.spot
    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    const handleClick = () => {
        // console.log(spot)
      setShowForm(!showForm); // Toggle the form visibility
    };


  return (
    <>
      <button onClick={handleClick} className="review-btn">Make Review</button>
      {showForm && <ReviewForm spot ={spot}/>
      }
    </>
  );
}
