const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const newsRoutes = require('./routes/news');

app.use(cors());
app.use(express.json()); 

app.use('/api/news', newsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
