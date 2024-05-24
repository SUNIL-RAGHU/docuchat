const projectService = require('../services/appwriteService');
const pdfService = require('../services/pdfService');
const Project = require('../models/Project'); 


// Controller function to handle project creation
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const pdfFile = req.file; 
    
        console.log('Title:', title);
        console.log('Description:', description);
 
        // Proceed with project creation
        const fileURL = await projectService.uploadFile(pdfFile);

        const project = await Project.create({
            title,
            description,
            fileURL,
            status: 'creating',
          });

        res.status(201).json({ title, description, fileURL });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
