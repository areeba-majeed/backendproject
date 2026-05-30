//database ko bht jgha use krna ho ga to iska aik utility function bnaen ge
const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
export {asyncHandler}

//another way without promises
//using higher order function...that can use function as a parameter
///step by step making function(3 steps)
////const asyncHandler=()=>{} //simple arrow function
//// const asyncHandler=(func)=>()=>{} //function parameter and one more arrow function
//// const asyncHandler=(func)=>async ()=>{}//second function ko async bna do

//next middlewares k liay use hota hai-->to switch the next flag
// const asyncHandler=(fn)=>async (req,res,next)=>{
//     try{
//         //executing the function we get in parameter
//         await fn(req,res,next)
//      }
//     catch(err)
//     {res.status(err.code ||500).json({
//         success:false,
//         message:err.message
//     })}
// }