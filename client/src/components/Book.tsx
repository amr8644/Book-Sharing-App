import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../reducers/authSlice";
import { getBook } from "../reducers/bookSlice";
import moment from "moment";
import Confirmation from "./Confirmation";
import Loader from "./Loader";
import toast from "react-hot-toast";

const Book = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector((state: any) => state.auth);
   const [show, setShow] = useState(false);

   const { books, isError, isSuccess, message, isLoading } = useSelector(
      (state: any) => state.books
   );

   const showBox = () => {
      setShow(true);
   };

   useEffect(() => {
      if (isError) {
         console.log(message);
      }
      if (!user) {
         navigate("/login");
         toast.error("Please login.");
      }
      dispatch(getBook());
      return () => {
         dispatch(reset());
      };
   }, [isError, isSuccess, message, navigate, dispatch, user]);

   if (isLoading) {
      return <Loader />;
   }

   return (
      <>
         <section className="w-full flex items-center justify-around flex-wrap my-10">
            {books.map((book: any) => {
               const { name, desc, image, createdAt, _id, postedBy } = book;
               return (
                  <div
                     key={_id}
                     className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto"
                  >
                     <img
                        alt="blog"
                        src={image}
                        className="max-h-40 w-full object-cover"
                     />
                     <div className="w-full flex items-end justify-end my-3">
                        <button className="text-gray-200" onClick={showBox}>
                           <svg
                              width="25"
                              height="25"
                              fill="black"
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z"></path>
                           </svg>
                        </button>
                     </div>
                     <div className="bg-white  w-full p-4">
                        <p className="text-gray-800  text-xl font-medium mb-2">
                           {name}
                        </p>
                        <p className="text-gray-400  font-light text-md">
                           {desc}
                        </p>
                        <div className="flex items-center mt-4">
                           <div className="flex flex-col justify-between ml-4 text-sm">
                              <p className="text-gray-800 ">{postedBy.name}</p>
                              <p className="text-gray-400 ">
                                 {moment(createdAt).fromNow()}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </section>
         {show && <Confirmation setShow={setShow} books={books} />}
      </>
   );
};

export default Book;
