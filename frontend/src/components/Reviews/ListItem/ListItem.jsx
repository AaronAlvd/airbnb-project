import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./ListItem.css";


const ListItem = ({ firstname, review, starsRating, onDelete }) => {
  return (
    <li className="list-item">
      <div className="username">{firstname}</div>
      <div className="review">{review}</div>
      <div className="stars-rating">{`⭐`.repeat(starsRating)}</div>
      <button className="delete-button" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} color="red" />
      </button>
    </li>
  );
};

export default ListItem;
