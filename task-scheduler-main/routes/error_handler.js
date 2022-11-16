class CustomAPIError extends Error{

    constructor(status,msg)
    {
        super(msg);
        this.StatusCode = status
    }

}


const APIerror = (status,msg)=>{
    return new CustomAPIError(status,msg);
}

const error_handle = (err,req,res,next)=>{
    if(err instanceof CustomAPIError)
    {
        console.log(err.message)
        return res.status(err.StatusCode).json({msg:err.message});
    }
    console.log(err.message)
    return res.status(500).json({msg:"Something went wrong, Try again"});
}


module.exports = {APIerror,error_handle}