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
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBooks = void 0;
const bookSchema_1 = __importDefault(require("../models/bookSchema"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookSchema_1.default.find().populate("postedBy", "_id name");
        res.status(200).json(books);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getBooks = getBooks;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, image } = req.body;
        if (!name || !desc || !image) {
            res.status(400);
            throw new Error("Please add a book");
        }
        const book = yield bookSchema_1.default.create({
            name: name,
            desc: desc,
            image: image,
            postedBy: req.user,
        });
        res.status(200).json(book);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookSchema_1.default.findById(req.params.id);
        if (!book) {
            res.status(400);
            throw new Error("Book not found");
        }
        const updatedBook = yield bookSchema_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookSchema_1.default.findById(req.params.id);
        if (!book) {
            res.status(400);
            throw new Error("Book not found");
        }
        if (book.postedBy.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }
        yield book.remove();
        res.status(200).json({
            id: req.params.id,
            message: "Book has been deleted",
        });
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
exports.deleteBook = deleteBook;
