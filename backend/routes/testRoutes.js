import express from "express";
import { pingCheck } from "../controllers/testsController.js";

const router = express.Router();

router.get("/ping", pingCheck);

export default router;