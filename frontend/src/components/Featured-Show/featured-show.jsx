import React from 'react'
import styles from './featured-show.module.css';
import { useNavigate } from 'react-router-dom';

function FeaturedShow(props) {

  const Show = props.show || {};

  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/videos/${Show.title}/${Show.id}`, {
      state: Show
    });
    // Alternatively, you can use:
    // navigate(`/videos/${props.id}`, { state: { image: props.image, name: props.name } });
    // This will navigate to the videos page with the name and id as part of the URL.
    // If you want to redirect to a specific path without using state, you can do:
    // window.location.href = '/videos'; // This will also work, but using navigate is more in line with React Router's practices.
  }
  return (
    <div className={styles.featuredShow} onClick={handleClick}>
        <img src={Show.image_url} key={Show.id} alt={Show.name} />
    </div>
  )
}

export default FeaturedShow