import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
