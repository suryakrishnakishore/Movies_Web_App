import { db } from "../libs/database.js";
import { comparePassword, createJWT, generateOtp, hashPassword } from "../libs/index.js";
import { transporter } from "../libs/otp.js";


db.connect();

export const requestOTP = async (req, res) => {
    const { email } = req.body;
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60000);

    try {
        await db.query(
            `INSERT INTO email_otps (email, otp_code, expires_at) VALUES ($1, $2, $3)`,
            [email, otp, expiresAt]
        );

        // Send Email
        await transporter.sendMail({
            from: `"Movies App Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Movies App OTP Code ',
            text: `Your OTP for Movies App LOG-IN is: ${otp}`,
        });

        res.status(200).send({ message: 'OTP sent to email' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error sending OTP' });
    }
}

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const result = await db.query(
            `SELECT * FROM email_otps WHERE email = $1 AND otp_code=$2 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
            [email, otp]
        );

        if (result.rows.length === 0) {
            return res.status(400).send({ message: 'Invalid or expired OTP' });
        }

        const userResult = await db.query(
            `INSERT INTO users (email, name) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING *`,
            [email, email.slice(0, email.indexOf("@") + 1)] // Default name, can be changed later
        );

        // const user = (userResult.rows.length !== 0 ) ? userResult?.rows[0] : await db.query(`SELECT * FROM users WHERE email =$1`, [email]).rows[0];

        let user;
        if (userResult.rows.length > 0) {
            user = userResult.rows[0];
        } else {
            const existingUserResult = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
            user = existingUserResult.rows[0];
        }
        console.log("Back user is: ", user);

        const token = createJWT(user.id, user.email);

        res.status(200).send({
            message: "OTP verified, Login Successful",
            token,
            user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Verification failed' });
    }
}

export const userCheck = async (req, res) => {
    const { userId } = req;

    try {
        const result = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({
            message: "User found",
            user: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error fetching user' });
    }
}