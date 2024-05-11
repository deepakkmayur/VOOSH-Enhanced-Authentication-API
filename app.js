const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dbConnect=require("./config/db")
const env=require("./env")
const PORT = env.PORT
const  validationMiddleware =require("./middleware/validationErrorHandler")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
dbConnect()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'swagger',
            version: '1.0.0',
            description: 'VHOOS API Documentation',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // Update with your server URL
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to API route files
}; 

const swaggerSpecs = swaggerJsdoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs))


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); 

app.use(validationMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
