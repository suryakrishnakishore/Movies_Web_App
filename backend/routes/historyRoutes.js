import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getHistory, postHistory } from "../controllers/historyController.js";

const router = express.Router();

router.patch("/movie", authMiddleware, postHistory);
router.get("/movie", authMiddleware, getHistory);

export default router;
