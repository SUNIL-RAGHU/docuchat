const axios = require('axios');
require('dotenv').config(); 

const cohereApiKey = process.env.COHERE_API_KEY;

exports.generateVectorEmbeddings = async (text) => {
    try {
        console.log(text)
        const response = await axios.post(
            'https://api.cohere.com/embed',
            {texts: text },
            { headers: { 'Authorization': `Bearer ${cohereApiKey}` } }
        );
        console.log(response.data.embeddings);
        return response.data.embeddings;
    } catch (error) {
        console.error('Error generating vector embeddings:', error);
        throw error;
    }
};


