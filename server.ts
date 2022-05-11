import express from "express";
const path = require("path");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./connection/db.ts");
import userRoute from "./routes/userRoute";
import bookRoute from "./routes/bookRoute";

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: false }));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "./client/build")));

   app.get("*", (req, res) =>
      res.sendFile(
         path.resolve(__dirname, "/", "client", "build", "index.html")
      )
   );
}

app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
