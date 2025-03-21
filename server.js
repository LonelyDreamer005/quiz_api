const express = require('express');
const app = express();
const cors = require('cors');

// Middleware to parse JSON and allow cross-origin requests
app.use(express.json());
app.use(cors());

// Port for the server
const PORT = process.env.PORT || 3000;

// Anime-based quiz data: Sword Art Online trivia
const quizData = [
  {
    question: "Who is the main protagonist of Sword Art Online?",
    options: ["Kirito", "Asuna", "Klein", "Agil"],
    answer: "Kirito"
  },
  {
    question: "Which game does Kirito get trapped in during Sword Art Online?",
    options: ["ALO", "GGO", "SAO", "Underworld"],
    answer: "SAO"
  },
  {
    question: "Who is the main female protagonist of Sword Art Online?",
    options: ["Leafa", "Asuna", "Sinon", "Alice"],
    answer: "Asuna"
  },
  {
    question: "What is Kirito's main weapon in Sword Art Online?",
    options: ["Sword", "Bow", "Gun", "Dagger"],
    answer: "Sword"
  },
  {
    question: "Which virtual reality world does Kirito visit after SAO?",
    options: ["ALO", "GGO", "Underworld", "Ordinal Scale"],
    answer: "ALO"
  },
  {
    question: "What is the name of the game where Kirito meets Sinon?",
    options: ["ALO", "GGO", "SAO", "Underworld"],
    answer: "GGO"
  },
  {
    question: "Who is the creator of Sword Art Online?",
    options: ["Reki Kawahara", "Yoshitsugu Matsuoka", "Tomohiko Ito", "Kazuto Kirigaya"],
    answer: "Reki Kawahara"
  },
  {
    question: "What is the name of Asuna's in-game character in Sword Art Online?",
    options: ["Kirito", "Silica", "Leafa", "Asuna"],
    answer: "Asuna"
  },
];

// Endpoint to get a random quiz question
app.get('/quiz', (req, res) => {
  // Randomly select a question
  const randomIndex = Math.floor(Math.random() * quizData.length);
  const selectedQuestion = quizData[randomIndex];
  
  res.json({
    question: selectedQuestion.question,
    options: selectedQuestion.options
  });
});

// Endpoint to check the answer and track score
let score = 0; // In-memory score tracker

app.post('/quiz/check', (req, res) => {
  const { question, answer } = req.body;

  // Find the correct answer from the quiz data
  const quizItem = quizData.find(q => q.question === question);

  if (!quizItem) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Check if the provided answer is correct
  const isCorrect = quizItem.answer.toLowerCase() === answer.toLowerCase();

  // Update score if the answer is correct
  if (isCorrect) {
    score += 1;
  }

  res.json({
    correct: isCorrect,
    correctAnswer: quizItem.answer,
    currentScore: score
  });
});

// Endpoint to reset the score (for a new game)
app.post('/quiz/reset', (req, res) => {
  score = 0; // Reset the score
  res.json({ message: "Score reset", currentScore: score });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
