import express from "express";

const router = express.Router();

import { createUser, loginUser, getUser } from "../controllers/userController";

import { check } from "../middleware/auth";

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", check, getUser);

export default router;
