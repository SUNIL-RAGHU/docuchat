const express = require('express');
const multer = require('multer');
const createProjectController = require('./controllers/projectController');
const dashboardProjectController = require('./controllers/dashboardController');
const chatProjectController = require('./controllers/chatController');
const sequelize = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const router = express.Router(); // No need to define a separate router instance

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });


// Define your routes
router.post('/api/create-project', upload.single('pdfFile'), createProjectController.createProject);

router.get('/api/projects', dashboardProjectController.dashboardProject);

router.post('/api/chat/:id', chatProjectController.chatProject);

// Mount the router at the base URL
app.use('/', router);

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
