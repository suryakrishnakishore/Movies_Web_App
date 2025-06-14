import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { deleteMyReview, getReviews, postMyReview } from "../controllers/reviewsController.js";

const router = express.Router();

router.get('/get-review/:id', authMiddleware, getReviews);
router.post('/post-review', authMiddleware, postMyReview);
router.delete('/delete-review/:r_id', authMiddleware, deleteMyReview);

export default router;