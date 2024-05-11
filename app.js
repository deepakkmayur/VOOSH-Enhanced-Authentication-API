const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dbConnect=require("./config/db")
const env=require("./env")
const PORT = env.PORT
const  validationMiddleware =require("./middleware/validationErrorHandler")


const app = express();
dbConnect()

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); 

app.use(validationMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
