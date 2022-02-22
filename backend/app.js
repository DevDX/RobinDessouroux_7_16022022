/* app.js très inspiré du P6 mais sans connexion à mongoose à vérifier rdx  */
const express = require('express');
const path = require('path');

// helmet 
const helmet = require('helmet');

const messageRoutes = require('./routes/message');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');


const app = express();

// helmet 
// const helmet = require('helmet');
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const db = require('./models/index.js');
db.sequelize.sync();  // création des tables

app.use(express.json()); //équivalent à app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/message', messageRoutes); 
app.use('/api/post', postRoutes);  
app.use('/api/auth', userRoutes);

module.exports = app; 