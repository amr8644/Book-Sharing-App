"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const app = (0, express_1.default)();
const dotenv = require("dotenv").config();
const connectDB = require("./connection/db.ts");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: false }));
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path.join(__dirname, "./client/build")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "./", "client", "build", "index.html")));
}
app.use("/api/users", userRoute_1.default);
app.use("/api/books", bookRoute_1.default);
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
