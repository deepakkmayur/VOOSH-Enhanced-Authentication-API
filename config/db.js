const mongoose=require("mongoose")
const {MONGO_URL} =require("../env")

const dbConnect=async ()=>{
  await mongoose.connect(MONGO_URL).then(()=>{console.log("Database connected successfully")}).catch((err)=>{
      console.log("database connection error\n",err);
   })
}

module.exports=dbConnect