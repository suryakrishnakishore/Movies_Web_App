import { db } from "../libs/database.js";

export const getMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await db.query(
            `SELECT * FROM movies WHERE id = $1`, [
            id
        ]
        );

        res.status(200).send({
            message: "Movie retrieved successfully.",
            movie: response.rows[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error getting movie." });
    }
}

export const getMovies = async (req, res) => {
    const { ids } = req.body;
    console.log("Ids", ids);
    
    try {
        const response = await db.query(
            `SELECT * FROM movies WHERE id = ANY($1::int[]) ORDER BY array_position($1::int[], id) `,
            [ids]
        );

        res.status(200).send({
            message: "All movies fetched successfully.",
            movies: response.rows
        });
    } catch (err) {
        console.log(err);
        
    }
}