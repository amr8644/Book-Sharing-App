"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
router.post("/", userController_1.createUser);
router.post("/login", userController_1.loginUser);
router.get("/me", auth_1.check, userController_1.getUser);
exports.default = router;
