// server/routes/news.js
const express = require('express');
const router = express.Router();
const { createStructuredNews, getAllNews } = require('../controllers/newsController');

router.post('/', createStructuredNews);
router.get('/', getAllNews);

module.exports = router;
