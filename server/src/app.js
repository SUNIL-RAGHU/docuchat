const express = require('express');
const multer = require('multer');
const createProjectController = require('./controllers/projectController');

const app = express();

const upload = multer();

app.post('/api/create-project', upload.single('pdfFile'), createProjectController.createProject);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
