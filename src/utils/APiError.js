////Node js Error class deta hai....to handle errors...
////mostly bht jgha error print krwana hota hai or uska format bhi same hon
//chaheiy so ye aik standard bna deta hai k error isi trha hi pass ho ga
//handling API errors
class ApiError extends Error{
constructor(
    statusCode,
    message="something wents wrong",
    errors=[],
    //error stack
    stack=""
){
    //overwriting the constructor
    super(message)
    this.statusCode=statusCode
    this.data=null //read it..
    this.message=message
    this.success=false
    this.errors=this.errors
    if(stack){
        this.stack=stack
    }
    else{
        Error.captureStackTrace(this,this.constructor)
    }
}
}
export {ApiError}