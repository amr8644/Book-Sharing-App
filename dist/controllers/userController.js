"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please add something...");
        }
        //   Check if User exists
        const userExist = yield userSchema_1.default.findOne({ email });
        if (userExist) {
            res.status(400);
            throw new Error("User already exists");
        }
        //   Hash Password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        //   Create User
        const user = yield userSchema_1.default.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: generateToken(user.id),
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid User");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userSchema_1.default.findOne({ email });
        const token = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.JWT_SECRET);
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
// @desc Get user data
// @route GET /api/users/me
// @access Private
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, email, name } = yield userSchema_1.default.findById(req.user._id);
        res.json({
            id: _id,
            name,
            email,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
