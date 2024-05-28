const LMService = require('../services/LMService');
const vectorEmbeddingService = require('../services/vectorEmbeddingService');
const chatService = require('../services/chatService');


exports.chatProject = async (req, res) => {
  const id = req.params.id;
  const message = req.body.message;
  console.log(message)
 

  const text = message.split(' ');
  try {
    const getemb = await LMService.getEmbeddingsByProjectId(id);
    const vectormessage = await vectorEmbeddingService.generateVectorEmbeddings(text);
    const answer = await chatService.handleUserQuestion(vectormessage, getemb,message);

    console.log(`Received message from user ${id}: ${message}`);
    console.log(answer)

    res.json({ success: true, message: answer });
  } catch (error) {
    console.error('Error handling chat request:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
