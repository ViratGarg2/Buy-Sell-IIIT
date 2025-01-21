const express = require('express');
const app = express();
const PORT = 3001;
const mongoURL = "mongodb+srv://gargvirat5:zRJAXvPCPhkKkJb1@cluster0.zsao1.mongodb.net/Buy-Sell?retryWrites=true&w=majority";
const mongo_connect = require('./connection.js');
const UserCreate = require('./routes/User_oper.js');
const DisplayProfile = require('./routes/Profile.js');
const cors = require("cors");
const Show_Orders = require("./routes/Show_Orders.js");
const Left_Orders = require('./routes/Left_Orders.js');
const {Item} = require('./routes/Product.js');
const Update = require('./routes/Update.js');
// const CheckLogin = require('./routes/Login.js');
mongo_connect(mongoURL);

app.use(cors({
    origin: "http://localhost:3000", // Your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "auth-token","Authorization"] // Include 'auth-token' here
  }));
  
  // Handle preflight requests for all routes
  app.options('*', cors());

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
app.use('/getData',(req,res)=>{
    Show_Orders(req,res);
    console.log('get Data');
});
app.use('/delivery',(req,res)=>{
    Left_Orders(req,res);
    console.log('Hi I am gr8');
})
app.use('/search',(req,res)=>{Item(req,res);console.log('searching')});

app.use('/update_profile',(req,res)=>{
    Update(req,res);
})
app.listen(PORT,()=>{
    console.log('listening on PORT');
})
