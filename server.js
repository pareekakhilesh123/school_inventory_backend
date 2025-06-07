const express = require('express');
const cors = require('cors');    
const app = express();
require('dotenv').config();
const db = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use(cors());  
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/users', categoryRoutes);
app.use('/api/users', itemRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
