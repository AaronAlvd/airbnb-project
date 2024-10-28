import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./ListItem.css";
import { useSelector } from 'react-redux';

const ListItem = ({ userId, firstname, review, starsRating, onDelete, createdAt }) => {
  const user = useSelector((state) => state.session.user);

  // Format the date
  const date = new Date(createdAt);
  const options = { month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <li className="list-item">
      <div className="username">{firstname}</div>
      <div className="review">{review}</div>
      <div className="stars-rating">{`⭐`.repeat(starsRating)}</div>
      <div className="date">{formattedDate}</div> {/* Display the formatted date */}
      {user !== null && userId === user.id && (
        <button className="delete-button" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} color="red" />
        </button>
      )}
    </li>
  );
};

export default ListItem;
