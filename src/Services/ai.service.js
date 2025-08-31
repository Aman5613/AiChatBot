const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(promt) {
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : promt
    })

    return response.text
}

module.exports = generateResponse