import { db } from "../libs/database.js";

export const getReviews = async (req, res) => {

    const { id } = req.params;

    try {
        const response = await db.query(
            `SELECT R.review_id, R.review, U.name AS user_name FROM movie_reviews R JOIN users U ON R.user_id = U.id WHERE movie_id = $1 ORDER BY R.review_id DESC`, [
                id
            ]
        );

        if (response.rows.length === 0) {
            return res.status(404).send({ message: 'No revies for the movie found' });
        }

        res.status(200).send({
            message: "All revies of the movie retrieved successfully",
            reviews: response.rows
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving reviews of the movie' });
    }
}

export const postMyReview = async (req, res) => {
    const { userId , userEmail } = req.body.user;

    const { my_review, id } = req.body;
    try {
        const resutl = await db.query(
            `INSERT INTO movie_reviews (review, movie_id, user_id) VALUES ($1, $2, $3) RETURNING *`, [
                my_review,
                id,
                userId
            ]
        );
        
        res.status(200).send({
            message: "Your review posted successfully...",
            reviews: resutl.rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error posting your review."
        });
        
    }
}

export const deleteMyReview = async (req, res) => {
    const { r_id } = req.params;
    console.log(r_id);
    
    try {
        const response = await db.query(
            `DELETE FROM movie_reviews WHERE review_id = $1`, [
                r_id
            ]
        );

        res.status(200).send({
            message: "Your review deleted successfully."
        })
    } catch (err) {
        console.log(err);
        
    }
}