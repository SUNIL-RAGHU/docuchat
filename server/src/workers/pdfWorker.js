const bullMQService = require('../services/bullMQService');
const pdfService = require('../services/pdfService');
const Project = require('../models/Project');

// Define BullMQ worker to process PDF files
bullMQService.worker.add('process-pdf', async (job) => {
  const pdfUrl = job.data.pdfUrl;
  const pdfContent = await pdfService.downloadPdf(pdfUrl);
  const vectorEmbeddings = pdfService.generateVectorEmbeddings(pdfContent);
  await Project.update({ status: 'created', vectorEmbeddings }, { where: { pdfUrl } });
  return 'PDF processing completed';
});
