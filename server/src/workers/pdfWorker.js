const { Worker, Queue } = require('bullmq');
const pdfService = require('../services/pdfService');
const vectorEmbeddingService = require('../services/vectorEmbeddingService')
const Project = require('../models/Project');
const redisConnection = require('../config/redis-connection');
const LMService=require('../services/LMService')


const pdfQueue = new Queue('pdf-queue', {
    connection: redisConnection
});

const worker = new Worker('pdf-queue', async (job) => {
    const { projectId, pdfBuffer } = job.data;

    try {
        const textContent = await pdfService.extractPDFText(pdfBuffer);
        console.log(textContent);

        const paragraphs = textContent.split('.');
        console.log(paragraphs)
        console.log(paragraphs[0])

        const  embeddings= await vectorEmbeddingService.generateVectorEmbeddings(paragraphs);
        await LMService.storeEmbeddings(projectId, paragraphs, embeddings);
        await Project.update({ status: 'created' }, { where: { id: projectId } });

    } catch (error) {
        console.error('Error processing PDF:', error);

        await Project.update(
            { status: 'failed' },
            { where: { id: projectId } }
        );
    }
});

worker.on('failed', (job, err) => {
    console.error('PDF Queue job failed:', err);
});

module.exports = {
    pdfQueue
};
