const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT;

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    console.log("Going wrong 2");
    if (!token) {
        console.log("Going wrong");
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.user && decoded.user.email){
        next(); 
        }else{
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

module.exports = verifyToken;
