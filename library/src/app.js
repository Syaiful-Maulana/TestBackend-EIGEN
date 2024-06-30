require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const libraryRoutes = require('./routes/library');
const sequelize = require('./config/model');
const swaggerUi = require('swagger-ui-express');
const swaggerJSON = require('./swagger.json');

const app = express();

// Middleware
app.use(bodyParser.json());

// Morgan
app.use(morgan('dev'));

// Routes
app.use(`${process.env.BASE_URL}/library`, libraryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//docs swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// Start server
const PORT = process.env.PORT || 5000;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

// run app
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
