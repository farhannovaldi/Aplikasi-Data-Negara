const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login");

// cek apakah sudah connect ke db apa belum
connect.then(()=>{
    console.log("Database connected succesfully");
})
.catch(()=>{
    console.log("Database cannot be connected")
});

// Buat skema Login
const SkemaLogin = new mongoose.Schema({
    username :{
        type:String,
        required : true
    },
        password :{
        type:String,
        required : true
    }
});

//Membuat Model
const collection = new mongoose.model("users",SkemaLogin);

module.exports = collection;