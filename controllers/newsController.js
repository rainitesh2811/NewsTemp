// server/controllers/newsController.js
const { processNews } = require('../services/gptService');
const supabase = require('../supabaseClient');

async function createStructuredNews(req, res) {
  const { rawNews, author, date, images } = req.body;

  if (!rawNews) return res.status(400).json({ error: 'News content is required' });

  try {
    const gptData = await processNews(rawNews);

    const { data, error } = await supabase
      .from('news')
      .insert([{
        ...gptData,
        body: rawNews,
        author: author || 'Anonymous',
        date: date || new Date().toISOString().slice(0, 10),
        images: images || []
      }]);

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('❌ Error in processNews:', err);
    res.status(500).json({ error: 'News processing failed' });
  }
}

async function getAllNews(req, res) {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch news' });
  }
}

module.exports = {
  createStructuredNews,
  getAllNews
};
