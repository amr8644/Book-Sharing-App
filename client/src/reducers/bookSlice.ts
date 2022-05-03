import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "../api/bookService";

const initialState = {
   books: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
};

export const getBook = createAsyncThunk(
   "books/get",
   async (_, thunkAPI: any) => {
      try {
         const token = thunkAPI.getState().auth.user.token;
         return await bookService.getBook(token);
      } catch (error) {
         const message =
            (error.respone &&
               error.respone.data &&
               error.respone.data.message) ||
            error.message ||
            error;
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const addBook = createAsyncThunk(
   "books/add",
   async (bookData: any, thunkAPI: any) => {
      try {
         const token = thunkAPI.getState().auth.user.token;
         return await bookService.addBook(bookData, token);
      } catch (error) {
         const message =
            (error.respone &&
               error.respone.data &&
               error.respone.data.message) ||
            error.message ||
            error;
         return thunkAPI.rejectWithValue(message);
      }
   }
);
export const deleteBook = createAsyncThunk(
   "books/delete",
   async (id: any, thunkAPI: any) => {
      try {
         const token = thunkAPI.getState().auth.user.token;
         return await bookService.deleteBook(id, token);
      } catch (error) {
         const message =
            (error.respone &&
               error.respone.data &&
               error.respone.data.message) ||
            error.message ||
            error;
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const bookSlice = createSlice({
   name: "books",
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false;
         state.isSuccess = false;
         state.isError = false;
         state.message = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(addBook.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addBook.fulfilled, (state: any, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.books.push(action.payload);
         })
         .addCase(addBook.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.message = action.payload;
         })
         .addCase(getBook.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getBook.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.books = action.payload;
         })
         .addCase(getBook.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.message = action.payload;
         })
         .addCase(deleteBook.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteBook.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.books = state.books.filter((book: any) => {
               // eslint-disable-next-line @typescript-eslint/no-unused-expressions
               return book._id !== action.payload.id;
            });
         })
         .addCase(deleteBook.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.message = action.payload;
         });
   },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
