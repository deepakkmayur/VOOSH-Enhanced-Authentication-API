const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../env")
const userModel = require("../models/User")


const tokenVerify = async (req, res, next) => {
   try {
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
         const token = req.headers.authorization.split(" ")[1]
         await jwt.verify(token, JWT_SECRET_KEY, async (error, decodeToken) => {
            if (error) {
               if (error.name === "TokenExpiredError") {
                  res.status(401).json({ message: "Token expired" })
               } else {
                  res.status(401).json({ message: "Invalid token" })
               }
            } else {
               // console.log(decodeToken);
               const user = await userModel.findOne({ _id: decodeToken.id }).select("-password")
               // console.log(user,"/////user///////");
               req.user = user
               next()
            }
         })

      } else {
         res.status(401).json({ message: "no token and not authorized" })
      }

   } catch (error) {
      console.log(error);
      res.status(400).json({ message: "catch error in tokenVerify" })
   }
}


module.exports = tokenVerify
