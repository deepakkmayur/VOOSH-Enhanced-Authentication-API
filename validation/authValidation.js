const { Joi } = require("express-validation");

const registerUser={
   body:Joi.object({
      name:Joi.string().pattern(/^[A-Za-z\s]+$/).min(4).required(),
      email:Joi.string().email().required(),
      password: Joi.string().min(5).required()
   })
}

const registerAdmin={
   body:Joi.object({
      email:Joi.string().email().required(),
      password: Joi.string().required(),
      adminSecretCode:Joi.string().min(5).required(),
   })
}
const loginUser={
   body:Joi.object({
      email:Joi.string().email().required(),
      password: Joi.string().required(),
   })
}
const loginAdmin={
   body:Joi.object({
      email:Joi.string().email().required(),
      password: Joi.string().required(),
      adminSecretCode:Joi.string().min(5).required(),
   })
}


module.exports = {
   registerUser,
   registerAdmin,
   loginUser,
   loginAdmin,

}