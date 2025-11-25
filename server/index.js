const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const AUTH_TOKEN = process.env.API_TOKEN || 'dev-token';

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store
let words = [
  {
    id: '1',
    arabic: 'السلام',
    english: 'Peace',
    transliteration: 'As-Salām',
    meaning: 'Peace and security',
    example: 'السلام عليكم',
    category: 'Greetings',
    difficulty: 'easy',
    createdBy: 'system',
  },
  {
    id: '2',
    arabic: 'الرحمن',
    english: 'The Most Merciful',
    transliteration: 'Ar-Raḥmān',
    meaning: 'One of the names of Allah emphasizing mercy',
    example: 'بسم الله الرحمن الرحيم',
    category: 'Names',
    difficulty: 'medium',
    createdBy: 'system',
  },
  {
    id: '3',
    arabic: 'الصلاة',
    english: 'Prayer',
    transliteration: 'As-Ṣalāh',
    meaning: 'The ritual prayer performed five times a day',
    example: 'الصلاة عماد الدين',
    category: 'Worship',
    difficulty: 'medium',
    createdBy: 'system',
  },
  {
    id: '4',
    arabic: 'الإيمان',
    english: 'Faith',
    transliteration: 'Al-Īmān',
    meaning: 'Belief in Allah and His messengers',
    example: 'الإيمان يزيد وينقص',
    category: 'Belief',
    difficulty: 'medium',
    createdBy: 'system',
  },
  {
    id: '5',
    arabic: 'الصبر',
    english: 'Patience',
    transliteration: 'As-Ṣabr',
    meaning: 'Perseverance and patience',
    example: 'الصبر مفتاح الفرج',
    category: 'Character',
    difficulty: 'easy',
    createdBy: 'system',
  },
  {
    id: '6',
    arabic: 'التقوى',
    english: 'Piety',
    transliteration: 'At-Taqwā',
    meaning: 'God-consciousness and righteousness',
    example: 'إن أكرمكم عند الله أتقاكم',
    category: 'Character',
    difficulty: 'hard',
    createdBy: 'system',
  },
];

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token !== AUTH_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

app.get('/api/words', (req, res) => {
  res.json(words);
});

app.get('/api/words/:id', (req, res) => {
  const word = words.find((w) => w.id === req.params.id);
  if (!word) {
    return res.status(404).json({ message: 'Word not found' });
  }
  return res.json(word);
});

app.post('/api/words', requireAuth, (req, res) => {
  const {
    arabic,
    english,
    transliteration,
    meaning,
    example,
    category,
    difficulty,
    createdBy = 'unknown',
  } = req.body;

  if (!arabic || !english) {
    return res.status(400).json({ message: 'arabic and english are required' });
  }

  const nextId = (words.length ? Number(words[words.length - 1].id) + 1 : 1).toString();
  const newWord = {
    id: nextId,
    arabic,
    english,
    transliteration: transliteration || '',
    meaning: meaning || '',
    example: example || '',
    category: category || 'General',
    difficulty: difficulty || 'medium',
    createdBy,
  };

  words.push(newWord);
  return res.status(201).json(newWord);
});

app.delete('/api/words/:id', requireAuth, (req, res) => {
  const index = words.findIndex((w) => w.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Word not found' });
  }
  const [deleted] = words.splice(index, 1);
  return res.json({ message: 'Deleted', word: deleted });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
