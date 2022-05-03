import React, { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { addBook } from "../reducers/bookSlice";
import Book from "../components/Book";
import Loader from "../components/Loader";

const Main = () => {
   const [bookData, setBookData] = useState({ name: "", desc: "", image: "" });

   const [show, setShow] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user, isLoading } = useSelector(
      (state: RootStateOrAny) => state.auth
   );

   const { name, desc, image } = bookData;

   const handleSubmit = (e: any) => {
      e.preventDefault();
      e.target.reset();
      dispatch(addBook(bookData));
      closeForm();
   };

   const handleChange = (e: any) => {
      setBookData((prevState: any) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const addItem = () => {
      if (!user) {
         navigate("/register");
      } else {
         setShow(true);
      }
   };
   const closeForm = () => {
      setShow(false);
   };

   useEffect(() => {
      if (!user) {
         navigate("/register");
      }
   }, [user, navigate]);

   if (isLoading) {
      return <Loader />;
   }

   return (
      <>
         <Header />
         {/* Hero Unit */}
         <div className="w-full">
            <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
               <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                  <span className="block">Share your favorite books</span>
                  <span className="block text-indigo-500">
                     It&#x27;s today or never.
                  </span>
               </h2>
               <div className="lg:mt-0 lg:flex-shrink-0">
                  <div className="mt-12 inline-flex rounded-md shadow">
                     <button
                        type="button"
                        onClick={addItem}
                        className="py-4 px-6  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Add a book
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {/* Add book form */}
         {show && (
            <div className="relative bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
               <button className="absolute right-3 top-3" onClick={closeForm}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     className="h-6 w-6 text-red-600"
                     viewBox="0 0 1792 1792"
                  >
                     <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                  </svg>
               </button>
               <div className="px-4 py-8 sm:px-10">
                  <div className="relative mt-6">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                     </div>
                     <div className="relative flex justify-center text-sm leading-5">
                        <span className="px-2 text-gray-500 bg-white">
                           Add your favorite book
                        </span>
                     </div>
                  </div>
                  <div className="mt-6">
                     <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div className="w-full">
                           <div className=" relative ">
                              <input
                                 type="text"
                                 id="search-form-price"
                                 className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                 placeholder="Name of the book"
                                 value={name}
                                 onChange={handleChange}
                                 name="name"
                              />
                           </div>
                        </div>
                        <div className="w-full">
                           <div className=" relative ">
                              <textarea
                                 id="search-form-location"
                                 className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                 placeholder="Description about the book"
                                 name="desc"
                                 value={desc}
                                 onChange={handleChange}
                              />
                           </div>
                        </div>
                        <div className="w-full">
                           <div className=" relative ">
                              <FileBase
                                 type="file"
                                 multiple={false}
                                 onDone={({ base64 }) =>
                                    setBookData({
                                       ...bookData,
                                       image: base64,
                                    })
                                 }
                              />
                           </div>

                           <span className="block w-full rounded-md shadow-sm mt-4">
                              <button
                                 type="submit"
                                 className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                              >
                                 Add
                              </button>
                           </span>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}

         {/* BOOKS SECTION */}
         <Book />
      </>
   );
};

export default Main;
