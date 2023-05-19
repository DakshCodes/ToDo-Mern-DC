export const errorhandler = (res,statusCode=500,message="Internal Server Error")=>{

    return res.status(statusCode).json({
    success:false,
    message,
    });
};

export const asyncError = (passedFunc)=>(req,res)=>{
  return Promise.resolve(passedFunc(req,res)).catch((err)=>{
   return errorhandler(res,500,err.message)
   });
}