import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getMovie, getMovies } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/get-movie/:id", authMiddleware, getMovie);
router.post("/get-movies", authMiddleware, getMovies);

export default router;