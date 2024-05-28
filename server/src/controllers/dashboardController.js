const projectService = require('../services/FirebaseService');
const Project = require('../models/Project');
const { pdfQueue } = require('../workers/pdfWorker');

exports.dashboardProject = async (req, res) => {
  try {
      // Fetch all projects from the database
    const projects = await Project.findAll();
    console.log(projects)

    // Send the projects as a response
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}}
