import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { logout, reset } from "../reducers/authSlice";

const Header = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useSelector((state: RootStateOrAny) => state.auth);

   const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/register");
   };

   return (
      <section className="w-full h-[90px] flex items-center justify-between shadow-lg">
         <h1 className=" text-3xl text-slate-900 font-semi px-2">
            Book Library
         </h1>
         <div className="flex md:w-1/4 sm:w-11/12 items-center justify-evenly">
            {user ? (
               <button
                  onClick={handleLogout}
                  className=" py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
               >
                  Logout
               </button>
            ) : (
               <>
                  <button
                     type="button"
                     className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                     <Link to="/register">Sign Up</Link>
                  </button>
                  <button
                     type="button"
                     className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                     <Link to="/login">Login</Link>
                  </button>
               </>
            )}
         </div>
      </section>
   );
};

export default Header;
