import axios from "axios";

const API_URL = "/api/books/";

const addBook = async (bookData: any, token: any) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.post(API_URL, bookData, config);
   return response.data;
};

const getBook = async (token: any) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(API_URL, config);
   return response.data;
};

const deleteBook = async (id: any, token: any) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.delete(`${API_URL}${id}`, config);
   return response.data;
};

const bookService = {
   addBook,
   getBook,
   deleteBook,
};

export default bookService;
