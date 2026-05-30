import express from 'express'
//// configure the environment variable as early as possible..
////but ye code ki consistency ko kharab krta hai...but run ho ga sahi se
//require('dotenv').config()
//more improved version: import dotenv then config it
import dotenv from "dotenv"
//// import mongoose from "mongoose"
// //import name of database from constants
//// import { DB_NAME } from './constants'

//importing connectedDB function 
//using index.js because error arrises if we do not put extension
import connectDB from "./db/index.js"
import app from './app.js'
//config dotenv
dotenv.config({
    path: './env'
})
//this is an async function so it will return a promise also..so "then"
connectDB()
.then(()=>{
    app.on('error',(error)=>{
        console.log('error:',error)
        throw error
    })
    //yaha server start ho ga or app database k liay listen karay gi
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`server is running ar port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`mongodb connection faild: ${err}`)
})

app.get("/test", (req,res)=>{
    res.send("WORKING")
})
/*
//connecting with database
import express from 'express'

const app = express()

    //database is always in other continent
    //database mn try catch or async wait lgao..better approach
    //using EFFI, execute function immediately
    //use semicolon before EFFI also to prevent error
    ; (async () => {
        try {
            //connect with database
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            //adding listener->used for express
            //if the db is connected may be express is not woking..so listeners are used
            app.on("error", () => {
                console.log("error: ", error)
                throw error
            })
            app.listen(process.env.PORT,()=>{
                console.log(`app is listening on port ${process.env.PORT}`)
            })

        }
        catch (error) {
            console.error("error", error)
            throw err
        }
    })()
        */
       //-------second approach for connecting with database(professional one)
       //sara code hm db folder k database file mn likh kr yaha export karain

