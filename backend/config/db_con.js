//require('dotenv').config();
const mongoose = require("mongoose");
const DBconnection = mongoose.connect("mongodb://127.0.0.1:27017/secure").then(() => {
    console.log('connected to MongoDB');
}).catch((err) => { console.error('error connecting to MongoDB',err)})
// const DBconnection = mongoose.connect(process.env.URI)

module.exports = DBconnection;
