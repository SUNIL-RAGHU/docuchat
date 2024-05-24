const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Project = require('../models/Project');
const appwriteService = require('../services/appwriteService');

// POST /api/projects
router.post('/', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  try {
    const fileId = await appwriteService.uploadFile(file);
    const project = await Project.create({ title, description, fileId, status: 'creating' });
    res.status(201).json({ message: 'Project created', project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

module.exports = router;
