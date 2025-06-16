import express from "express";
import authRoutes from "./authRoutes.js";
import detailRoutes from "./detailRoutes.js";
import showsRoutes from "./showsRoutes.js";
import reviewsRoutes from "./reviewsRoutes.js";
import moviesRoutes from "./moviesRoutes.js";
import historyRoutes from "./historyRoutes.js";
import testRoutes from "./testRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/details", detailRoutes);
router.use("/shows", showsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/movies', moviesRoutes);
router.use('/history', historyRoutes);
router.use('/test', testRoutes);

export default router;