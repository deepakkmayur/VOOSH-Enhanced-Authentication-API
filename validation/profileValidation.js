const { Joi } = require("express-validation");

const createMyProfile={
   body:Joi.object({
      bio: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
      phone: Joi.string().regex(/^[56789]\d{9}$/).required(),
   })
}

const updateProfile={
   body:Joi.object({
      bio: Joi.string().pattern(/^[A-Za-z\s]+$/).optional(),
      phone: Joi.string().regex(/^[56789]\d{9}$/).optional(),
      isProfile:Joi.boolean().optional(),
      photoUrl:Joi.string().optional(),

      email:Joi.string().email().required(),
      name:Joi.string().pattern(/^[A-Za-z\s]+$/).optional(),
      password:Joi.string().optional(),
   })
}

const userProfilePrivacy={
   body:Joi.object({
      isPublic: Joi.boolean().required(),
   })
}


module.exports = {
   createMyProfile,
   updateProfile,
   userProfilePrivacy,
}