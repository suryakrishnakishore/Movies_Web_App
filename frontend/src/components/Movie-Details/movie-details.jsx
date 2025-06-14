import React, { useEffect, useState } from 'react'
import styles from './movie-details.module.css';
import { RiThumbDownLine, RiThumbUpLine, RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import api from '../../libs/apiCalls.js';

function MovieDetails({ movie }) {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [Likes, setLikes] = useState(null);

    if (!movie || Object.keys(movie).length === 0) {
        return <div className={styles.container}>No movie details available.</div>;
    }

    async function getLikes() {
        try {
            const result = await api.get(`/movies/get-movie/${movie.id}`);

            if(result.status === 200) {
                // console.log("Fetched Movie: ", result.data.movie);
                
                setLikes(result.data.movie.likes);
            }
        } catch (err) {
            console.log(err);
            
        }
    }
    async function handleLike(e) {
        setLiked(!liked);
        let likes = Likes + 1;
        console.log("Likes: ", likes);
        
        try {
            const result = await api.patch("/shows/liked", {
                id: movie.id,
                sign: 1
            });

            console.log("My_result: ", result);
            
            if (result.status === 200) {
                setLikes(likes);
                movie.likes = likes;
                // Optionally check response.status here
            }
        } catch (err) {
            console.log(err);

        }

        try {
            console.log("I'm trying for liked-movie", movie.id);
            
            const response = await api.patch("/shows/liked-movie", {
                    id: movie.id
                });
        }
        catch (err) {
            console.log(err);
            
        }
    }

    async function handleRemoveLike(e) {
        setLiked(!liked);
        let likes = (Likes) - 1;
        try {
            const result = await api.patch("/shows/liked", {
                id: movie.id,
                sign: -1
            });

            if (result.status === 200) {
                setLikes(likes);
                movie.likes = likes;
            }

        } catch (err) {
            console.log(err);

        }

        try {
            const response = await api.patch("/shows/disliked-movie", {
                    id: movie.id
                });
        } catch (err) {
            console.log(err);
        }
    }

    async function checkLiked() {
        try {
            const response = await api.get(`/shows/check-liked/${movie.id}`);
            if (response.status === 200) {
                if (response.data.status === true) {
                    setLiked(true);
                }
            }
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        getLikes();
        checkLiked();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{movie.title}</h1>

                <div className={styles.stats}>
                    <div className={styles.likes}>
                        <p>{movie.views} <span>views</span></p>
                    </div>
                    <div className={styles.likes}>
                        {liked === false ? <RiThumbUpLine className={styles.thumb} onClick={handleLike} /> : <RiThumbUpFill className={styles.thumb} onClick={handleRemoveLike} />}
                        <span>{Likes} | </span>
                        {disliked === false ? <RiThumbDownLine className={styles.thumb} onClick={() => setDisliked(!disliked)} /> : <RiThumbDownFill className={styles.thumb} onClick={() => setDisliked(!disliked)} />}
                    </div>
                </div>


            </div>

            <div className={styles.details}>
                <div className={styles.info}>
                    <p><strong>Actors:</strong> {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors} </p>
                    <p><strong>Genre:</strong> {Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</p>
                    <p><strong>Rating:</strong> {movie.rating}/10</p>
                    <p><strong>Runtime:</strong> {movie.duration} minutes</p>
                    <p><strong>Languages:</strong> {Array.isArray(movie.languages) ? movie.languages.join(', ') : movie.languages} </p>
                    <p><strong>Release Date:</strong> {(movie.release_date.slice(0, 10))}</p>
                    <p><strong>Overview:</strong> {movie.description}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails