const client = require('./config/connectDB');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT;

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const customerRoute = require('./routes/customerRoute')

app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", customerRoute);

app.listen(port, function () {
    console.log("Server Running...");
  })