import "./ShowCaseReviews.css";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
export default function ShowCaseReviews({isOwner}, {spot}) {
  return (
    <>

      <div className="Review-list">
        <h2 className="title">Reviews</h2>
        <ul>
          <li>#1</li>
          <li>#2</li>
          <li>#3</li>
          <li>Evvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv</li>
        </ul>

      {!isOwner && ( <button id="reviewbutton" className="RF-modalButton">
            <OpenModalButton
              buttonText="Make Review"
              modalComponent={<ReviewForm props={spot}  />}
            />{" "}
          </button>)}
          </div>
    </>
  );
}
