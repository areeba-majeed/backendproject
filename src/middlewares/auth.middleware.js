//verify krna hai k user hai ya nhi hai
//on basis of jwt..because login krne pr user ko refresh token milta hai...to login again n again

import { ApiError } from "../utils/APiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
export const verifyJWT=asyncHandler(async(req,res,next)=>{
   try {
     //accesstoken ka access lo
     //may be cookie na ho..user aik header send karay(in postman)
     //header se aata hai authorization token in format: Bearer <token>
     //but we only need token so replace is used 
     const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     if (!token) {
         throw new ApiError(401,'unabutorized request')
     }
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user =await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user) 
     {
         //todo: discuss about frontend
     throw new ApiError(401,'invalid access token')
    }
    req.user=user
    next()
   } catch (error) {
    throw new ApiError(401,error?.message || "invalid access token")
   }


})