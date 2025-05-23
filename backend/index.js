const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoURL = process.env.MONGO_URL;
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const mongo_connect = require('./connection.js');
const UserCreate = require('./routes/User_oper.js');
const DisplayProfile = require('./routes/Profile.js');
const Show_Orders = require("./routes/Show_Orders.js");
const Left_Orders = require('./routes/Left_Orders.js');
const Item = require('./routes/Product.js');
const Item2 = require('./routes/Detail.js');
const Update = require('./routes/Update.js');
const addToCart = require('./routes/addToCart.js');
const support = require('./routes/Support.js');
const Cart = require('./routes/Cart.js');
const Buy = require('./routes/Buy.js');
const checkOtp = require('./routes/Otp.js');
const sell = require('./routes/Sell.js');
const add_comment = require('./routes/addComment.js');
const removeFromCart = require('./routes/Remove.js');
const Protection = require('./routes/Protection.js');
const frontend_url = process.env.BACKEND_URL;
mongo_connect(mongoURL);


app.use(cors({
    origin: frontend_url, // Your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "auth-token","Authorization"] // Include 'auth-token' here
  }));
  
  // Handle preflight requests for all routes
  app.options('*', cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",{frontend_url});
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
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


app.use('/update_profile',Protection,(req,res)=>{
    Update(req,res);
})
app.use('/add_to_cart/:id',Protection,(req,res)=>{
    const id = req.params.id;
    console.log('id is',id);
    addToCart(req,res,id);
})
app.use('/remove/:id',Protection,(req,res)=>{
    const id = req.params.id;
    console.log('id is',id);
    removeFromCart(req,res,id);
})
app.use('/support',Protection,(req,res)=>{
    support(req,res);
})
app.use('/getcart',Protection,(req,res)=>{
    Cart(req,res);
})
app.use('/buy',Protection,(req,res)=>{
    console.log('Buy from cart');
    Buy(req,res);
})
app.use('/check_otp/:id',Protection,(req,res)=>{
    const id = req.params.id;
    // console.log('id2 is',id);
    checkOtp(req,res);
})
app.use('/add_comment/:id',Protection,(req,res)=>{
    // const id = req.params.id;
    // console.log('id2 is',id);
    add_comment(req,res);
})
app.use('/sell',Protection,sell)

  
app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}...`);
})
