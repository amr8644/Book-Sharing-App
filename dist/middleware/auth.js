"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const check = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "please log in" });
    }
    const token = authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" });
        }
        const { _id } = payload;
        userSchema_1.default.findById(_id).then((userdata) => {
            req.user = userdata;
            next();
        });
    });
};
exports.check = check;
