const dotenv = require("dotenv")
const express = require('express'); //requiring express so that we can use it 
const app = express();              //we create new variable named app so whenever we need to use express we will call app

dotenv.config({path:'./config.env'});
//before we had link which we used to get connected to atlas now we create config.env file in which our link for connection will stay so we do leak it out


//then before we had big command for mongoose and its functionality to get connected now we create new file named db in that our mongoose code will stay so 
// we dont have to write it everytime now we just have to require it wherever we want it that simple it is
require('./db/conn');


app.use(express.json());

app.use(require('./router/auth.js'));

//here we did connection with mongo db
const PORT = process.env.PORT 

//middleware
const middleware = (req,res,next)=>{
console.log(`Hello from middleware`)
next();
}

//app.get to get request from server
app.get('/',(req,res)=>{
    res.send(`Hello from server`)
});
app.get('/appointment',middleware,(req,res)=>{
    res.send(`Hello from appointment`)
});
app.get('/calender',(req,res)=>{
    res.send(`Hello from calender`)
});
app.get('/signup',(req,res)=>{
    res.send(`Hello from register`)
});
app.get('/signin',(req,res)=>{
    res.send(`Hello from login`)
})
//here / /about /contact /signup /signin is our webpage path whenver we will go there it will give some response for eg Hello from server
app.listen(PORT,()=>{
   console.log(`server running at ${PORT}`)
})
//app.listen is create to know that our server will run on this port and we did console log so we will know our server is running and there are no errors   