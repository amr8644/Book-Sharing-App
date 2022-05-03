import Books from "../models/bookSchema";

export const getBooks = async (req: any, res: any) => {
   try {
      const books = await Books.find().populate("postedBy", "_id name");
      res.status(200).json(books);
   } catch (error) {
      console.log(error);
   }
};

export const addBook = async (req: any, res: any) => {
   try {
      const { name, desc, image } = req.body;

      if (!name || !desc || !image) {
         res.status(400);
         throw new Error("Please add a book");
      }

      const book = await Books.create({
         name: name,
         desc: desc,
         image: image,
         postedBy: req.user,
      });

      res.status(200).json(book);
   } catch (error: any) {
      res.status(400);
      throw new Error(error);
   }
};
export const updateBook = async (req: any, res: any) => {
   try {
      const book = await Books.findById(req.params.id);

      if (!book) {
         res.status(400);
         throw new Error("Book not found");
      }

      const updatedBook = await Books.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
         }
      );
      res.status(200).json(updatedBook);
   } catch (error: any) {
      res.status(400);
      throw new Error(error);
   }
};

export const deleteBook = async (req: any, res: any) => {
   try {
      const book = await Books.findById(req.params.id);
      if (!book) {
         res.status(400);
         throw new Error("Book not found");
      }

      if (book.postedBy.toString() !== req.user.id) {
         res.status(401);
         throw new Error("User not authorized");
      }

      await book.remove();

      res.status(200).json({
         id: req.params.id,
         message: "Book has been deleted",
      });
   } catch (error: any) {
      res.status(400);
      throw new Error(error);
   }
};
