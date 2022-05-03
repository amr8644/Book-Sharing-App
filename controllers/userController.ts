import User from "../models/userSchema";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: any, res: any) => {
   try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
         res.status(400);
         throw new Error("Please add something...");
      }
      //   Check if User exists
      const userExist = await User.findOne({ email });
      if (userExist) {
         res.status(400);
         throw new Error("User already exists");
      }

      //   Hash Password

      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(password, salt);

      //   Create User

      const user = await User.create({
         name: name,
         email: email,
         password: hashedPassword,
      });

      if (user) {
         res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user.id),
         });
      } else {
         res.status(400);
         throw new Error("Invalid User");
      }
   } catch (error) {
      console.log(error);
   }
};

export const loginUser = async (req: any, res: any) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET as any);
      if (user && (await bycrypt.compare(password, user.password))) {
         res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token,
         });
      }
   } catch (error) {
      console.log(error);
   }
};

// @desc Get user data
// @route GET /api/users/me
// @access Private

export const getUser = async (req: any, res: any) => {
   try {
      const { _id, email, name } = await User.findById(req.user._id);

      res.json({
         id: _id,
         name,
         email,
      });
   } catch (error) {
      console.log(error);
   }
};

const generateToken = (id: any) => {
   return jwt.sign({ id }, process.env.JWT_SECRET as any, {
      expiresIn: "30d",
   });
};
