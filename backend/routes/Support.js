const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT;
// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI);

// Retrieve the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the support function
const supp = async function(req, res) {
  try {
    const authToken = req.header("auth-token");
    const decoded = jwt.verify(authToken,JWT_SECRET);

    // Extract user ID from the decoded token
    const userId = decoded.user.email;

    // Find user in the database
    const user = await User.findOne({email:userId});
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const userName = user.first_name;

    const systemPrompt = `You are a friendly and helpful chatbot for the 'Buy Sell IIIT' website. Your goal is to assist users in a conversational and personalized manner.
    
    Instructions:
    1. The user you are talking to is ${userName}. Address them by their name to make the conversation personal.
    2. Provide clear and concise answers.
    3. Do NOT use any markdown formatting like bold, italics, or asterisks for lists. Use simple newlines to format lists if needed.
    4. Information about the website's tabs:
    - Home: The main page with featured items.
    - Search: To find specific items.
    - History: To see all past orders.
    - Delivery: To see all pending orders.
    - Cart: To view items added to the cart.
    - Support: The page for getting help.
    - Profile: To manage account details.
    - Sell: To list items for sale, including uploading images.

    Now, please respond to the user's message.`;

    const userMessage = req.body.message;

    const result = await model.generateContent([
      systemPrompt,
      userMessage
    ]);
    const response = result.response;
    const text = response.text();

    if(text){
      res.json({ success: true, message: text });
    }
    else{
      res.status(500).json({ success: false, message: 'Failed to generate a response.' });
    }

  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = supp;