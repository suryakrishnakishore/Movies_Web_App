import React, { useEffect, useState } from 'react'
import styles from './movie-reviews.module.css';
import api from '../../libs/apiCalls.js';
import useStore from '../../store/index.js';

function MovieReviews({ id, name }) {

  const [userReviews, setUserReviews] = useState([]);
  const [myreview, setMyreview] = useState('');
  const [post, setPost] = useState(false);

  const { user } = useStore((state) => state);

  console.log("My review: ", myreview);
  

  async function handleReviewSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post(`/reviews/post-review`, {
        my_review: myreview,
        id: id
      });

      console.log(response.data.reviews);
      
    } catch (err) {
      console.log(err);
    } finally {
      setMyreview("");
      getUserReviews();
    }
  }

  async function getUserReviews() {
    try {
      const response = await api.get(`/reviews/get-review/${id}`);

      if(response.status == 200){
        console.log(response.data.reviews);
        setUserReviews(response.data.reviews);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  async function handleDelete (e, r_id) {
    e.preventDefault();
    console.log("R_id", r_id);
    
    try {
      const result = await api.delete(`/reviews/delete-review/${r_id}`);

      if(result.status === 200) {
        setUserReviews(prev => prev.filter(r => r.review_id !== r_id));
      }
      
    } catch (err) {
      console.log(err);
      
    }
  }

  useEffect(() => {
    getUserReviews();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Movie Reviews</h2>
      <div>

        <form className={styles.reviewForm} method="post" onSubmit={handleReviewSubmit}>
          <textarea type="text" onInput={handleInput} placeholder='Write your review...' value={myreview} onChange={(e) => setMyreview(e.target.value)}/>
          <div className={styles.buttons}>
            <button type='button' className={myreview.length >0 ? styles.clear : styles.clearInactive} onClick={() => setMyreview('')}>Clear</button>
            {myreview.length > 0 ?
              <button type='submit' className={styles.post}>Post</button>
              :
              <button className={styles.post} disabled>Post</button>
            }
          </div>
        </form>

        <div className={styles.reviews}>
          {userReviews.map((review, ind) => (
            <div key={ind} className={styles.review}>
              <h3>{review.user_name}</h3>
              <div className={review.user_name === user.name ? styles.edit : styles.editInactive}>
                <button className={styles.delete} onClick={(e) => handleDelete(e, review.review_id)}>Delete</button>
                <button className={styles.editButton}>Edit</button>
              </div>
              <p>{review.review}</p>
              
            </div>
            
          ))}
          <div className={styles.review}>
            
            <h3>John Doe</h3>
            <p>This movie was fantastic! The plot twists were unexpected and the acting was top-notch.</p>
          </div>
          <div className={styles.review}>
            <h3>Jane Smith</h3>
            <p>I didn't enjoy this movie as much. The pacing was slow and the characters were not well developed.</p>
          </div>
          <div className={styles.review}>
            <h3>Alex Johnson</h3>
            <p>Amazing cinematography! The visuals were stunning and the soundtrack complemented the film perfectly.</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MovieReviews