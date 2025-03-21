const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Port for the server
const PORT = process.env.PORT || 3000;

// Dummy quiz data (in-memory)
const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "What is the color of the sky?",
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: "Blue"
  }
];

// Endpoint to get the quiz questions
app.get('/quiz', (req, res) => {
  res.json(quiz);
});

// Endpoint to check the answer
app.post('/quiz/check', (req, res) => {
  const { question, answer } = req.body;

  const quizItem = quiz.find(q => q.question === question);

  if (!quizItem) {
    return res.status(404).json({ message: "Question not found" });
  }

  const isCorrect = quizItem.answer.toLowerCase() === answer.toLowerCase();
  res.json({
    correct: isCorrect,
    correctAnswer: quizItem.answer
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
