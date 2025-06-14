import express from 'express';
import { getDetails, postDetails } from '../controllers/detailsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put("/userInfo", authMiddleware, postDetails);
router.get("/userInfo", authMiddleware, getDetails);


export default router;

