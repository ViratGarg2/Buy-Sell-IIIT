const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBC04eJnk96W0uBMAQaVrC1DiF1zFhkPd0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how  you work";
const supp = async function(message){
    console.log('working');
const result = await model.generateContent(message);
res.json({message:result.response.text()});
console.log(result.response.text());
}
module.exports = supp;