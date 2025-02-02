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
const Item = require('./routes/Product.js');
const Item2 = require('./routes/Detail.js');
const Update = require('./routes/Update.js');
const addToCart = require('./routes/addToCart.js');
const support = require('./routes/Support.js');
const Cart = require('./routes/Cart.js');
const mongoose = require('mongoose');
const Buy = require('./routes/Buy.js');
const checkOtp = require('./routes/Otp.js');
const sell = require('./routes/Sell.js');
const add_comment = require('./routes/addComment.js');
const removeFromCart = require('./routes/Remove.js');
const Protection = require('./routes/Protection.js');
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
// app.use('/check',Protection);
app.use('/api',UserCreate);
app.use('/profile',Protection,DisplayProfile);

app.use('/getData',Protection,(req,res)=>{
    Show_Orders(req,res);
    console.log('get Data');
});
app.use('/delivery',Protection,(req,res)=>{
    Left_Orders(req,res);
    // console.log('Hi I am gr8');
})

app.use('/search/:id',Protection,(req,res)=>{ const id = req.params.id; // Get the id from the URL
    console.log('got it, ID:', id);
    Item2(req,res,id);
});

app.use('/search',(req,res)=>{Item(req,res);console.log('searching')});


app.use('/update_profile',(req,res)=>{
    Update(req,res);
})
app.use('/add_to_cart/:id',(req,res)=>{
    const id = req.params.id;
    console.log('id is',id);
    addToCart(req,res,id);
})
app.use('/remove/:id',(req,res)=>{
    const id = req.params.id;
    console.log('id is',id);
    removeFromCart(req,res,id);
})
app.use('/support',Protection,(req,res)=>{
    support(req,res);
})
app.use('/getcart',(req,res)=>{
    Cart(req,res);
})
app.use('/buy',(req,res)=>{
    console.log('Buy from cart');
    Buy(req,res);
})
app.use('/check_otp/:id',(req,res)=>{
    const id = req.params.id;
    // console.log('id2 is',id);
    checkOtp(req,res);
})
app.use('/add_comment/:id',(req,res)=>{
    // const id = req.params.id;
    // console.log('id2 is',id);
    add_comment(req,res);
})
app.use('/sell',Protection,sell)

app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}...`);
})
