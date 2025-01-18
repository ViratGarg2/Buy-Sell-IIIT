const express = require('express');
const app = express();
const PORT = 3001;
const mongoURL = "mongodb+srv://gargvirat5:zRJAXvPCPhkKkJb1@cluster0.zsao1.mongodb.net/Buy-Sell?retryWrites=true&w=majority";
const mongo_connect = require('./connection.js');
const UserCreate = require('./routes/User_oper.js');
const DisplayProfile = require('./routes/Profile.js');
// const CheckLogin = require('./routes/Login.js');
mongo_connect(mongoURL);

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/api',UserCreate);
app.use('/profile',DisplayProfile);

app.listen(PORT,()=>{
    console.log('listening on PORT');
})
