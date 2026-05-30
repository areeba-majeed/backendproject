import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/APiError.js'
import {User} from '../models/user.model.js'
import {uploadonCloudinary} from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'

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
   console.log('email',email);
   console.log('fullname',fullname)
   console.log('username:',username)
   console.log('password',password)
   //validations
   //old syntax
//    if (fullname===""){
//     throw new ApiError(400,'full name is required')
//    }
//advanced code
   if (
    [fullname,email,username,password].some((field)=>
    field?.trim()==="")
   ){
    throw new ApiError(400,'all fields are required')
   }
//check user existance
//function mongodb that can find any user from database
const existedUser=await User.findOne({
    //can check multuple fields
    $or: [{ email },{ username }]
})
if(existedUser){
    throw new ApiError(409,'user already exists')
}
//file access using multer middleware
//need first property of avatar..
const avatarLocalPath=req.files?.avatar[0]?.path
//local path of cover image
//const coverimageLocalPath=req.files?.coverImage[0]?.path;
let coverimageLocalPath
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
coverimageLocalPath=req.files.coverImage[0].path
}
//check krna hai k path aya bhi hai ya nhi
if(!avatarLocalPath){
    throw new ApiError(400,'avatar is required')
}
//ab cloudinary pr upload karo
//it is timetaking
const avatar=await uploadonCloudinary(avatarLocalPath)
const coverImage=await uploadonCloudinary(coverimageLocalPath)
//checking avatar gia ya nhi..as avatar is requred
if(!avatar){
    throw new ApiError(400,'avatar is required')
}
// now crate entry in database
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    password,
    email,
    username:username.toLowerCase()
})
const createdUserCheck=await User.findById(user._id).select(
    "-password -refreshToken"
)
//check for user creation && remove password & refreshtoken from db
//use await..as it is timetaking because db is another continent
//find the user by id(created by db)
//using select method-it contains that which we do not want to show in db

if(!createdUserCheck){
    throw new ApiError(500,'server: something wents wrong while registering user')
}
//now there is Apiresponse
return res.status(200).json(
    new ApiResponse(200,createdUserCheck,'user has been created successfully')
)
})



export {registerUser}