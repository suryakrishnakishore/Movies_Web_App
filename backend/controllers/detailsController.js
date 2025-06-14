import { db } from "../libs/database.js";

export const postDetails = async (req, res) => {
    const { userId , userEmail } = req.body.user;
    const { name, gender, dob, language } = req.body;

    try {
        const result = await db.query(`UPDATE users SET name = $1, gender = $2, dob = $3, language = $4 WHERE id = $5 RETURNING *`,
            [name, gender, dob, language, userId]
        )
        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: "User details updated successfully",
            user: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating user details' });
    }
}

export const getDetails = async (req, res) => {
    const { userId, userEmail } = req.body.user;

    try {
        const result = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        console.log("User details retrieved: ", result.rows[0]);
        
        res.status(200).send({
            message: "User details retrieved successfully",
            user: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving user details' });
    }
}
