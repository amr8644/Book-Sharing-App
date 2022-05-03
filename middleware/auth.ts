import jwt from "jsonwebtoken";
import User from "../models/userSchema";

export const check = (req: any, res: any, next: any) => {
   const { authorization } = req.headers;

   if (!authorization) {
      return res.status(401).json({ error: "please log in" });
   }
   const token: any = authorization.split(" ")[1];

   jwt.verify(
      token,
      process.env.JWT_SECRET as any,
      (err: any, payload: any) => {
         if (err) {
            return res.status(401).json({ error: "you must be logged in" });
         }
         const { _id } = payload;
         User.findById(_id).then((userdata) => {
            req.user = userdata;

            next();
         });
      }
   );
};
