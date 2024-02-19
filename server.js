const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors'); 
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectdb = require('./config/dbConnection');

const app = express();

const port = process.env.PORT || 5000;

connectdb();
// const corsOptions = {
//     origin: 'http://localhost:3000', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   };

app.use('/uploads', express.static('uploads'));

  
app.use(cors());
  
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
