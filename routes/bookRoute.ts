import express from "express";
import {
   addBook,
   deleteBook,
   getBooks,
   updateBook,
} from "../controllers/bookController";

import { protect } from "../middleware/authMiddleware";
import { check } from "../middleware/auth";

const router = express.Router();

router.route("/").get(check, getBooks).post(check, addBook);

router.route("/:id").delete(check, deleteBook).put(updateBook);

export default router;
