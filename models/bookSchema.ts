import mongoose from "mongoose";
import { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new Schema(
   {
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
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("Books", bookSchema);
