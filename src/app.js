import express from "express"
import cors from "cors"
//user k cookies ko set krna...
import cookieParser from 'cookie-parser'

const app=express()
//use method middleware or configurations k liay use hota hai
//cors se hm ensure krte hain k bs hamara frontend hi backend se connect ho sakay
//so hm origin ko select krte hain khud
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//.........3 major configuration
//data multiple jgha se or multiple type ka aa skta hai...
app.use(express.json({limit:"16kb"}))
//url se data bhi aa ska hai
//url data ko different way se encode krta hai like "%areeba20" or "+areeba%"
//extended na bhi use kro to it will be run..extended mean nested objects
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// jb files ko store krna chahty hain like pdf or images ko apne server pr hi store krna hai
// to public folder bna dety hain k koi bhi dekh saky
app.use(express.static("public"))
///cookie parser
////user k browser ki cookie access krta hai or apni cookies set kr skte hain
//secure cookies ko user k browser mn rakhna...
app.use(cookieParser())
//another way to export
export {app}