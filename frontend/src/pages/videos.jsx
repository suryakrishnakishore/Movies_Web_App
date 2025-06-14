import React, { useEffect } from 'react'
import Header from '../components/navigation/header';
import { useLocation } from 'react-router-dom';
import useStore from '../store';
import VideoPlayer from '../components/Video-Player/video-player';
import styles from './videos.module.css';
import MovieDetails from '../components/Movie-Details/movie-details';
import MovieReviews from '../components/Movie-Reviews/movie-reviews';
import api from '../libs/apiCalls';

function Videos() {

  const { user } = useStore((state) => state);

  const location = useLocation();
  const movie = location.state || {};

  async function postUserHistory () {
    try {
      const response = await api.patch("/history/movie", {
        id: movie.id
      });

      if(response.status === 200){
        console.log("History recorded.");
        
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log("Movie: ", movie);
  console.log("Movie-user", user);
  
  useEffect(() => {
    postUserHistory();
  })
  return (
    <div>
        <Header name={user.name}/>
        <div className={styles.container}>
            
            <VideoPlayer />
            <MovieDetails movie={movie} />
            <MovieReviews id={movie.id} name = {movie.name} />
        </div>
    </div>
  )
}

export default Videos