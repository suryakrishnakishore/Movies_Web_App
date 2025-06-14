import express from "express";
import { checkMovieLiked, featuredShows, getfavShows, likedShows, postfavShows, removefavShows } from "../controllers/showsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/featured", authMiddleware, featuredShows);
router.patch("/liked", authMiddleware, likedShows);
router.patch("/liked-movie", authMiddleware, postfavShows);
router.get("/liked", authMiddleware, getfavShows);
router.get("/check-liked/:id", authMiddleware, checkMovieLiked);
router.patch("/disliked-movie", authMiddleware, removefavShows);

export default router;