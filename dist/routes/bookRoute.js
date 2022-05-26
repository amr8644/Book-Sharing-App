"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route("/").get(auth_1.check, bookController_1.getBooks).post(auth_1.check, bookController_1.addBook);
router.route("/:id").delete(auth_1.check, bookController_1.deleteBook).put(bookController_1.updateBook);
exports.default = router;
