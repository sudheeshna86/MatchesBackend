import express from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites
} from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:matchId", authMiddleware, addFavorite);
router.delete("/:matchId", authMiddleware, removeFavorite);
router.get("/", authMiddleware, getFavorites);

export default router;
