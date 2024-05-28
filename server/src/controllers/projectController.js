
// controllers/projectController.js
const projectService = require('../services/FirebaseService');
const Project = require('../models/Project');

const { pdfQueue } = require('../workers/pdfWorker');

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const pdfFile = req.file;
    const pdfBuffer = req.file.buffer;

    console.log('Title:', title);
    console.log('Description:', description);

    // Upload the file and get the URL
    const fileURL = await projectService.uploadFile(pdfFile);

    // Create a new project in the database
    const project = await Project.create({
      title,
      description,
      fileURL,
      status: 'creating',
    });
    res.status(200).json({ message: 'Project created successfully', projectId: project.id });
    
    // Add the project data to the PDF processing queue
    await pdfQueue.add('process', { projectId: project.id, pdfBuffer });
    console.log('Job added to the PDF queue successfully.');

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};