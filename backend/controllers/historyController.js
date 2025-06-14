import { db } from "../libs/database.js";

export const postHistory = async (req, res) => {
    const { userId } = req.body.user;
    const { id } = req.body;

    try {
        const response = await db.query(
            `UPDATE uesr_history SET history = ARRAY_PREPEND($1, ARRAY_REMOVE(history, $1)) WHERE id = $2`, [
                id, 
                userId
            ]
        );

        res.status(200).send(
            {
                message: "Movie added to history."
            }
        )
    } catch (err) {
        console.log(err);
        
    }
}

export const getHistory = async (req, res) => {
    const { userId } = req.body.user;

    try {
        const response = await db.query(
            `SELECT (history) FROM uesr_history WHERE id = $1`, [userId]
        )

        res.status(200).send({
            message: "User's history retrieved successfully.",
            user_history: response.rows[0]
        })
    } catch (err) {
        console.log(err);
        
    }
}

