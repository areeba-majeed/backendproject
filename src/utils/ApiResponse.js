//error k liay nod.js class de deta hai lekin requestresponse  core node.js
//mn ni ho rhi..is k liay express hai..
//ye class response k errors handle karay gi

class ApiResponse{
    constructor(
        statusCode,data,message="success"
    ){
        this.statusCode=statusCode,
        this.data=data
        this.message=message
        this.success=statusCode <400 //beacuse ye status API response k liay set kr rhy hain
        //server k statuscodes hoty hain...
        //server se informational data ja rha hai to uska statuscode 100-199
        //server error response (500-599)
        //client error response (400-499)
    }
}

export default ApiResponse