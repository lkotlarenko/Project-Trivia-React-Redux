const questionsResponse = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "hard",
      question:
        "What was the name of the hero in the 80s animated video game &#039;Dragon&#039;s Lair&#039;?",
      correct_answer: "Dirk the Daring",
      incorrect_answers: ["Arthur", "Sir Toby Belch", "Guy of Gisbourne"],
    },
    {
      category: "Entertainment: Musicals & Theatres",
      type: "multiple",
      difficulty: "medium",
      question:
        "In which Shakespeare play does the character Marcellus say, &quot;Something is rotten in the state of Denmark&quot;?",
      correct_answer: "Hamlet",
      incorrect_answers: ["Macbeth", "King Lear", "Twelfth Night"],
    },
    {
      category: "Entertainment: Video Games",
      type: "boolean",
      difficulty: "easy",
      question:
        "In the &quot;Half-Life&quot; series, &quot;H.E.V&quot; stands for &quot;Hazardous Evasiveness Vest&quot;",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Mathematics",
      type: "boolean",
      difficulty: "easy",
      question:
        "An equilateral triangle always has every angle measuring 60&deg;.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      category: "Entertainment: Japanese Anime & Manga",
      type: "multiple",
      difficulty: "hard",
      question: "Who was the Author of the manga Uzumaki?",
      correct_answer: "Junji Ito",
      incorrect_answers: [
        "Noboru Takahashi",
        "Akira Toriyama",
        "Masashi Kishimoto",
      ],
    },
  ],
};

const expiredQuestionsResponse = {
  "response_code":3,
  "results":[]
};

module.exports = { questionsResponse, expiredQuestionsResponse };