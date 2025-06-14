import React, { useEffect, useState } from 'react'
import styles from "./user-history.module.css";
import api from '../../libs/apiCalls';
import Show from '../Show/show';

function UserHistory() {

    const [history, setHistory] = useState([]);
    const [movies, setMovies] = useState([]);

    async function getUserHistory() {
        try {
            const response = await api.get("/history/movie");

            if (response.status === 200) {
                console.log(response.data.user_history.history);
                setHistory(response.data.user_history.history);

            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getHistoryMovies() {
        // history = [3, 7, 12, ...]
        const response = await api.post('/movies/get-movies', { ids: history });

        if (response.status === 200) {
            console.log(response.data.movies);

            setMovies(response.data.movies);
        }

    }
    useEffect(() => {
        getUserHistory();

    }, []);
    useEffect(() => {
        if (history.length > 0) getHistoryMovies();
    }, [history]);
    return (
        <div className={styles.historyContainer}>
            <h2>Your History</h2>
            <div className={styles.parent}> 
                {movies?.map((movie, ind) => (
                    <Show key={ind} image={movie.image_url} />
                ))}
            </div>
        </div>
    )
}

export default UserHistory