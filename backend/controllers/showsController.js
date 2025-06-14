import { db } from "../libs/database.js";

export const featuredShows = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT * FROM movies ORDER BY COALESCE(likes, 0) DESC, COALESCE(views, 0) LIMIT 3`
        );

        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'No featured shows found' });
        }

        res.status(200).send({
            message: "Featured shows retrieved successfully",
            shows: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving featured shows' });
    }
}

export const likedShows = async (req, res) => {
    const { id, sign } = req.body;
    try {
        const result = await db.query(
            `UPDATE movies SET likes = likes + $1 WHERE id = $2`, [
                sign,
                id
            ]
        );

        res.status(200).send({
            message: "Likes increased"
        });
    } catch (err) {
        console.log(err);
        
    }
}

export const postfavShows = async (req, res) => {
    const {userId} = req.body.user;
    const { id } = req.body;

    console.log("id", id);
    console.log("userId", userId);
    
    try {
        const response = await db.query(
            `UPDATE users SET liked = array_append(liked, $1) WHERE id = $2`, [
                id, 
                userId
            ]
        );

        res.status(200).send({
            message: "Movied added to your favourites"
        });
    } catch (err) {
        console.log(err);
        
    }
}

export const removefavShows = async (req, res) => {
    const { userId } = req.body.user;
    const { id } = req.body;

    console.log("id", id);
    console.log("userId", userId);
    
    
    try {
        const response = await db.query(
            `UPDATE users SET liked = array_remove(liked, $1) WHERE id = $2`, [
                id, 
                userId
            ]
        )

        res.status(200).send({
            message: "Movies removed from your favourites"
        });
    } catch (err) {
        console.log(err);
        
    }
}

export const getfavShows = async (req, res) => {
    const { userId } = req.body.user;
    try {
        const response = await db.query(
            `SELECT liked FROM users WHERE id = $1`, [
                userId
            ]
        );

        res.status(200).send({
            message: "All favourite movies fetched successfully.",
            favMovies: response.rows[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Failed fetching your favourite movies."});
    }
}

export const checkMovieLiked = async (req, res) => {
    const { userId } = req.body.user;
    const { id } = req.params;
    try {
        const response = await db.query(
            `SELECT * FROM users WHERE id = $1 AND $2 = ANY(liked)`, [
                userId,
                id
            ]
        );

        if(response.rows.length > 0){
            res.status(200).send({
                message: "You like this movie.",
                status: true
            });
        } else {
            res.status(200).send({
                message: "Not one of your liked movies.",
                status: false
            });
        }
    } catch (err) {
        console.log(err);
        
    }
}
