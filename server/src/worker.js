const { Worker, Queue } = require('bullmq');
const pdfUtils = require('./utils/pdfUtils');
const Project = require('./models/Project');

const pdfQueue = new Queue('pdf-processing');

const worker = new Worker('pdf-processing', async (job) => {
  const fileId = job.data.fileId;

  try {
    const text = await pdfUtils.extractTextFromPDF(fileId);
    const vectorEmbeddings = await pdfUtils.generateVectorEmbeddings(text);
    await Project.update({ vectorEmbeddings }, { where: { fileId } });
    return { success: true };
  } catch (error) {
    console.error('Error processing PDF file:', error);
    throw new Error('Failed to process PDF file');
  }
});

worker.on('completed', (job) => {
  console.log(`PDF processing job ${job.id} completed successfully`);
});

pdfQueue.process(async (job) => {
  await worker.process(job);
});
