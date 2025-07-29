// server/services/gptService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function processNews(rawNews) {
  try {
    const result = await model.generateContent([
      { role: 'user', parts: [{ text: `Structure the following news:\n${rawNews}` }] }
    ]);
    const response = await result.response;
    const text = response.text();

    // Extract structured fields from text (you can adjust this parser)
    return {
      headline: text.match(/Headline:(.*)/)?.[1]?.trim() || '',
      summary: text.match(/Summary:(.*)/)?.[1]?.trim() || '',
      category: text.match(/Category:(.*)/)?.[1]?.trim() || '',
    };
  } catch (err) {
    console.error('Gemini Error:', err);
    throw new Error('Gemini API failed.');
  }
}

module.exports = { processNews };
