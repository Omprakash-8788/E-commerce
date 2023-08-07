const express = require('express')
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser")
const router = express.Router();
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(cookieParser())
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

//middleware for errors
app.use(errorMiddleware);
module.exports = app
