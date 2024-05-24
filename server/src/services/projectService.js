// const appwriteService = require('./appwriteService');
// const bullMQService = require('./bullMQService');
// const Project = require('../models/Project');


// exports.createProject = async (pdfFile) => {

//   const pdfUrl = await appwriteService.uploadFile(pdfFile);
//   console.log(pdfUrl);
//   return pdfUrl;

// //   // Enqueue PDF processing task
// //   bullMQService.enqueuePdfProcessingTask(pdfUrl);
     


// //   // Store project details in database
// //   const project = await Project.create({ title, description, pdfUrl, status: 'creating' });

// //   return project;
// };
