const express = require('express');
const cors = require('cors');   // 1. CORS module import karo
const app = express();
require('dotenv').config();
const db = require('./db/db');
const userRoutes = require('./routes/userRoutes');

app.use(cors());  // 2. CORS middleware use karo (sab origins allow kar dega)
app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
