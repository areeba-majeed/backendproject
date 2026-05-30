import mongoose from 'mongoose'
const { Schema } = mongoose
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//creating the schema of user
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true

    },
    coverImage:{
        type:String
    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[8,'password length must be 8']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

//hooks for using jwt and bcrypt
//using async, because it is timetaking to converting the password into encrypted string
//do not use arrow function here because here is the need of correct context
//using 'next' because it is like a middleware, we want to encrypt password just before saving data into db

//bcrypt has function 'hash' -> need 2 params: field for encryption, and hash round
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }

    this.password = await bcrypt.hash(this.password, 10)
})
//ab kuch methods bnaen ge for validation of password because mongodb now has encrypted password
//userschema has an object that is methods
//we can build custom methods
userSchema.methods.isPasswordCorrect=async function(password){
    //bcrypt can aslo check password
    //compare needs 2 parameters: simple password, and encrypted password(this.password)
//using await because cryptography hai to time lagy ga
    return await bcrypt.compare(password,this.password) //return true & false
}


//jwt is a bearer token..jo usko bear krta hai usko access mil jati hai..
//user jb login krta hai to token generate hota hai..server wo token user ko de deta hai..
//now user will send that token with every request..no need to login again  n again
//having 3 parts:
//header payload(data) signature(token is real or modified)
userSchema.methods.generateAccessToken=function(){
    //this creates jwt token
    return jwt.sign(
        //payload
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}
)
}
//now generate refresh token
userSchema.methods.generateRefreshToken=function(){
    //this task is not so much timetaking so no need to async
    return jwt.sign(
        {
        _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model('User',userSchema)