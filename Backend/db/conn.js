const mongoose = require('mongoose'); //first we require it by using this command 

const DB = process.env.DATABASE //then we decalared DB as database because our link is present in env file now whenver we will call DB it will read that file


mongoose.connect(DB).then(()=>{ //here we create mongoose connection and in fat arrow bracket we declared its DB then arrow function to console log if its connected
    console.log(`connection successfull`)
}).catch((error)=>console.log(`connection failed`)); //here we used catch com or func which will let us know if connection failed or succesfull


//here is our  mongoose connection code which will help us to connect with mongoose db