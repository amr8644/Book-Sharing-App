import express from "express";
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./connection/db.ts");
import userRoute from "./routes/userRoute";
import bookRoute from "./routes/bookRoute";

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
