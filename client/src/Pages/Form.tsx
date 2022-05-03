import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { register, reset } from "../reducers/authSlice";

const Form = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
   });

   const { name, email, password, password2 } = formData;

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { user, isError, isSuccess, message, isLoading } = useSelector(
      (state: any) => state.auth
   );

   useEffect(() => {
      if (isError || !user) {
         console.log(message);
         toast.error("Something went wrong. Please try again");
      }
      if (isSuccess || user) {
         navigate("/");
      }
      dispatch(reset());
   }, [user, isError, isSuccess, message, navigate, dispatch]);

   const handleSubmit = (e: any) => {
      e.preventDefault();

      if (password !== password2) {
         console.log("passwords does not match");
      } else {
         interface UserInterface {
            name: any;
            email: any;
            password: any;
         }
         const userData: UserInterface = {
            name,
            email,
            password,
         };
         dispatch(register(userData));
      }
   };

   const handleChange = (e: any) => {
      setFormData((prevState: any) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };
   if (isLoading) {
      return <Loader />;
   }
   return (
      <>
         <div className=" mt-10 flex flex-col items-center justify-center  px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl ">
               Create a new account
            </div>
            <span className="justify-center text-sm text-center text-gray-500 flex-items-center">
               Already have an account ?
               <a
                  href="/login"
                  className="text-sm text-blue-500 underline hover:text-blue-700"
               >
                  Sign in
               </a>
            </span>
            <div className="p-6 my-5 ">
               <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-2 ">
                     <div className=" relative  ">
                        <input
                           type="text"
                           id="create-account-pseudo"
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                           name="name"
                           placeholder="Name"
                           value={name}
                           onChange={handleChange}
                        />
                     </div>
                  </div>
                  <div className="flex gap-4 my-5 ">
                     <div className=" relative ">
                        <input
                           type="email"
                           id="create-account-last-name"
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                           name="email"
                           placeholder="Email"
                           value={email}
                           onChange={handleChange}
                        />
                     </div>
                  </div>
                  <div className="flex flex-col mb-y">
                     <div className=" relative ">
                        <input
                           type="password"
                           id="create-account-email"
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                           placeholder="Password"
                           value={password}
                           name="password"
                           onChange={handleChange}
                        />
                     </div>

                     <div className="relative my-5">
                        <input
                           type="password"
                           id="create-account-email"
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                           placeholder="Confirm your password"
                           value={password2}
                           name="password2"
                           onChange={handleChange}
                        />
                     </div>
                  </div>
                  <div className="flex w-full my-5 ">
                     <button
                        type="submit"
                        className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Sign Up
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default Form;
