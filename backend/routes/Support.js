const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDSFDrtVMfeYXh6dt8o914DTb4449wIfRA");

// Retrieve the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the support function
const supp = async function(req, res) {
  try {
    // Extract the user's message from the request body
    const userMessage = req.body.message;

    // Generate a response using the Gemini model
    const result = await model.generateContent([
      userMessage
    ]);
    if(result.response.text()){
    // console.log(result.response.text());
    res.json({ success: true, message: result.response.text() });
    }
    else{
        console.log('hello');
    }
    // console.log('go for it');
    // Send the generated response back to the client
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = supp;
