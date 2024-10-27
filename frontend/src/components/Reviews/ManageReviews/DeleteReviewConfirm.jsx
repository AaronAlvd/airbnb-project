import { useDispatch } from 'react-redux';
import * as reviewActions from '../../../store/review';

function DeleteReviewConfirm({ reviewId }) {
  const dispatch = useDispatch();

  const deleteReview = async () => {
    try {
      const response = await dispatch(reviewActions.deleteReview(reviewId));

      if (!response.ok) {
        throw new Error('Failed to delete review')
      }

      const data = await response.json();
      return data;
    } catch(err) {
      console.error('Failed to delete review', err);
    }
  }

  return (
    <div className='div-confirmDelete'>
      <button onClick={deleteReview}>Confirm Delete</button>
    </div>
  )
}

export default DeleteReviewConfirm;