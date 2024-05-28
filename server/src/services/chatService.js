const axios = require('axios');
require('dotenv').config(); 

const cohereApiKey = process.env.COHERE_API_KEY


 function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}

async function generateDetailedAnswer(question, relevantParagraphs) {
    try {
      const response = await axios.post(
        'https://api.cohere.com/generate',
        {
          prompt: `Question: ${question}\n\nRelevant Context:\n${relevantParagraphs.join('\n\n')}\n\nAnswer:`,
          max_tokens: 1024,
          temperature: 0.7,
          k: 0,
          p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE',
        },
        {
          headers: {
            'Authorization': `Bearer ${cohereApiKey}`,
          },
        }
      );
  
      return response.data.text;
    } catch (error) {
      console.error('Error generating detailed answer:', error.message);
      throw error;
    }
  }

async function handleUserQuestion(question, storedEmbeddings,ask) {
  const questionEmbedding = question[0];
  let relevantParagraphs = [];
  let highestSimilarity = -1;

  for (const stored of storedEmbeddings) {
    const similarity = cosineSimilarity(questionEmbedding, stored.embedding);
    if (similarity > 0.5) {
      relevantParagraphs.push(stored.paragraph);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
      }
    }
  }

  if (relevantParagraphs.length > 0) {
    const detailedAnswer = await generateDetailedAnswer(ask, relevantParagraphs);
    return detailedAnswer;
  } else {
    return "No relevant answer found.";
  }
}

module.exports = {
  cosineSimilarity,
  generateDetailedAnswer,
  handleUserQuestion
};
