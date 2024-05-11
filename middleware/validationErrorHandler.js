

const { ValidationError } =require("express-validation");

const validationErrorHandler = (err, req, res, next)=>{
   if (err instanceof ValidationError) {
    const message = err && err.details && err.details.body && err.details.body.length>0 && err.details.body[0] && err.details.body[0].message ? err.details.body[0].message : 'Unknown error occurred'
    console.log(message ,"-----------validationHandler message----------------");
     return res.status(err.statusCode).json({ message});
   } 
   return res.status(500).json(err);  
 }

 module.exports=  validationErrorHandler



