import {asyncHandler} from '../utils/asyncHandler.js'

const registerUser=asyncHandler(async(req,res)=>{
   //register users steps:
   //get user detail from frontend (here we get data from postman)
   //validation-not empty
   // check if user already exits
   //check for images
   //check for avatar
   //upload them to cloudinary
   //create user object..to upload on mongodb-create entry in db
   //remove password and refresh token field from response
   //check for user creation ->response aya k ni
   //return response

   const {fullname,email,username,password}=req.body
   console.log('email',email)

})

export {registerUser}