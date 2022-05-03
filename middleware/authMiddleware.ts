import jwt from "jsonwebtoken";
import User from "../models/userSchema";

export const protect = async (req: any, res: any, next: any) => {
   let token: any;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         //    Get Token from header
         token = req.headers.authorization.split(" ")[1];

         //  Verify token
         interface JwtPayload {
            id: any;
            name: string;
            password: string;
         }

         const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as any
         ) as JwtPayload;

         //  Get user from the token
         req.user = await User.findById(decoded.id).select("-password");

         next();
      } catch (error) {
         res.status(401);
         console.log(error);
         throw new Error("Not authorized");
      }
      if (!token) {
         res.status(401);
         throw new Error("Not authorized, no token");
      }
   }
};
