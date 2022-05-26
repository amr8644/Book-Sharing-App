"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const { ObjectId } = mongoose_1.default.Schema.Types;
const bookSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: [true, "Please add a book"],
    },
    desc: {
        type: String,
        required: [true, "Please add a desc"],
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Books", bookSchema);
