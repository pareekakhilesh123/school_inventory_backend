const express = require('express');
const cors = require('cors');    
const app = express();
require('dotenv').config();
const db = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const issueRoutes = require('./routes/issueRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const grnRoutes = require('./routes/grnRoutes');

const stockRoutes = require('./routes/stockRoutes');
const itemRoutes = require('./routes/itemRoutes');
const studentRoutes = require('./routes/studentRoutes');


app.use(cors());  
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api', stockRoutes);
 
app.use('/api', transactionRoutes);
app.use('/api/issues', issueRoutes);

app.use('/api/grns', grnRoutes);

app.use('/api/items', itemRoutes);

app.use('/api/students', studentRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
