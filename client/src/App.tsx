import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Pages/Form";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import "./index.css";
import { Toaster } from "react-hot-toast";

const App = () => {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<Main />} />
               <Route path="/register" element={<Form />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </Router>
         <Toaster />
      </>
   );
};

export default App;
