const Embedding = require('../models/embedding');

exports.storeEmbeddings = async (projectId, paragraphs, embeddings) => {
  try {
    const createdEmbeddings = await Promise.all(embeddings.map((embedding, index) => {
      return Embedding.create({
        projectId: projectId,
        paragraph: paragraphs[index],
        embedding: embedding,
      });
    }));

    console.log('Embeddings stored successfully:', createdEmbeddings);
    return createdEmbeddings;
  } catch (error) {
    console.error('Error storing embeddings:', error);
    throw error;
  }
};

exports.getEmbeddingsByProjectId = async (projectId) => {
    try {
      const embeddings = await Embedding.findAll({
        where: { projectId: projectId },
        attributes: ['paragraph', 'embedding'] 
      });
  
      return embeddings.map(embedding => ({
        paragraph: embedding.paragraph,
        embedding: embedding.embedding
      }));
    } catch (error) {
      console.error('Error fetching embeddings by project ID:', error.message);
      throw error;
    }
  }
  
