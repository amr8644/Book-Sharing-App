import React from "react";

import { useDispatch } from "react-redux";

import { deleteBook } from "../reducers/bookSlice";

const Confirmation = ({ setShow, books }) => {
   const dispatch = useDispatch();

   const deleteItem = () => {
      dispatch(deleteBook(id));
      closeBox();
   };

   const closeBox = () => {
      setShow(false);
   };

   const id = books.map((book: any) => {
      const { _id } = book;
      return _id;
   });

   return (
      <div className="absolute shadow-lg rounded-2xl p-4 bg-white w-64 ">
         <div className="w-full h-full text-center">
            <div className="flex h-full flex-col justify-between">
               <svg
                  width="40"
                  height="40"
                  className="mt-4 w-12 h-12 m-auto text-red-500"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
               </svg>
               <p className="text-gray-800  text-xl font-bold mt-4">
                  Delete Book
               </p>
               <p className="text-gray-600 text-xs py-2 px-6">
                  Are you sure you want to delete this book ?
               </p>
               <div className="flex items-center justify-between gap-4 w-full mt-8">
                  <button
                     type="button"
                     onClick={deleteItem}
                     className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                     Delete
                  </button>
                  <button
                     type="button"
                     onClick={closeBox}
                     className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-red-500 focus:ring-offset-red-200 text-red-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Confirmation;
