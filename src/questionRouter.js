// questionRouter.js
const express = require('express');
const router = express.Router();

// Mock database of questions
const questions = {
  1: {
    id: 1,
    text: "Compare and contrast the winter holiday celebrations of two Northern hemisphere countries",
    type: "essay"
  },
  2: {
    id: 2,
    text: "Explain the process of photosynthesis in plants",
    type: "essay"
  },
  // ... add more questions as needed
};

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const question = questions[id];
  
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

router.post('/submit', (req, res) => {
  const { answers } = req.body;
  
  if (!answers || !Array.isArray(answers) || answers.length !== Object.keys(questions).length) {
    return res.status(400).json({ error: 'Invalid submission' });
  }
  
  submittedAnswers = answers;
  res.json({ message: 'Answers submitted successfully' });
});

router.get('/submitted-answers', (req, res) => {
  if (submittedAnswers) {
    res.json(submittedAnswers);
  } else {
    res.status(404).json({ error: 'No answers submitted yet' });
  }
});

module.exports = router;