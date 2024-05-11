# DIGIMETA-Social-media-backend
# RUN
To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables inside env.js file(not inside .env). Below are the variables that you need to set in order to run the application:
# note : environmental variables are set inside env.js file not inside .env

PORT ="any port number"

MONGO_URL:"mongo url",

JWT_SECRET_KEY:"any secret key",

 ADMIN_REGISTRATION_CODE:"any secret key",

 GOOGLE_CLIENT_ID: 'your google client id',
 
 GOOGLE_CLIENT_SECRET: 'your google client secret key',
 
 callbackURL: 'your google redirect url',
 
 SECRET_KEY:"any secret key"






After you've set these environmental variables in the env.js file at the root of the project, intsall node modules using "npm install" command, include  "start": "nodemon app.js" in scripts of package.json file and then start the server using "npm start" command.


