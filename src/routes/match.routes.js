import express from "express";
import { getMatches } from "../controllers/match.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMatches);

export default router;
