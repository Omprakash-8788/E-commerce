const app = require('./app')
const express = require("express")
const ex = express();
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

//handling uncaught exception
process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`)
    process.exit(1);

})

dotenv.config({path:"BackEnd/config/config.env"})
connectDatabase()


const server = app.listen(process.env.PORT, () =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
}) 


//uncaught promise rejection
// ex.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    })
})