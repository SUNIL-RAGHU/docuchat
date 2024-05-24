// const express = require('express');
// const multer = require('multer');
// const createProjectController = require('./controllers/projectController');

// const app = express();

// const upload = multer();

// app.post('/api/create-project', upload.single('pdfFile'), createProjectController.createProject);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const multer = require('multer');
const createProjectController = require('./controllers/projectController');
const sequelize = require('./config/database'); // Import the Sequelize instance

const app = express();
const upload = multer();

app.post('/api/create-project', upload.single('pdfFile'), createProjectController.createProject);

// Sync the Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');

    // Start the server after syncing the models
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
