import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./ListItem.css";
import { useSelector } from 'react-redux';

const ListItem = ({userId, firstname, review, starsRating, onDelete }) => {
const user = useSelector((state) => state.session.user);

  return (
    <li className="list-item">
      <div className="username">{firstname}</div>
      <div className="review">{review}</div>
      <div className="stars-rating">{`⭐`.repeat(starsRating)}</div>
      {userId === user.id &&( <button className="delete-button" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} color="red" />
      </button>)}

    </li>
  );
};

export default ListItem;
