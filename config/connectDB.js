require('dotenv').config();
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

module.exports = { mongoose };