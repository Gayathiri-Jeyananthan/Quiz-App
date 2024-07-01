// Define questions array
const questions = [
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
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    }
];

// Initialize variables
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerInterval;
let timeRemaining = 10;

const timerElement = document.getElementById("time");
const questionTitle = document.getElementById("questionTitle");
const optionsList = document.getElementById("optionsList");
const submitAnswerButton = document.getElementById("submitAnswer");
const resultCard = document.getElementById("resultCard");
const restartQuizButton = document.getElementById("restartQuiz");
const cancelQuizButton = document.getElementById("cancelQuiz");

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    resultCard.style.display = "none";
    restartQuizButton.style.display = "none";
    timeRemaining = 10;
    displayQuestion();
    startTimer();
}

// Start the timer
function startTimer() {
    timerElement.textContent = timeRemaining;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);
}

// Display the current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    optionsList.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => selectOption(option, li);
        optionsList.appendChild(li);
    });
}

// Highlight the selected option
let selectedOption = null;
function selectOption(option, li) {
    selectedOption = option;
    Array.from(optionsList.children).forEach(item => {
        item.style.backgroundColor = item === li ? "#ddd" : "";
    });
}

// Submit the selected answer
function submitAnswer() {
    if (!selectedOption) return alert("Please select an option!");
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        correctAnswers++;
    }
    selectedOption = null;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        clearInterval(timerInterval);
        timeRemaining = 10;
        displayQuestion();
        startTimer();
    } else {
        displayResult("Quiz Completed!");
    }
}

// Display the result
function displayResult(message) {
    clearInterval(timerInterval);
    resultCard.style.display = "block";
    resultCard.textContent = `${message} Your score is ${correctAnswers}/${questions.length}.`;
    restartQuizButton.style.display = "block";
}

// Cancel the quiz
function cancelQuiz() {
    clearInterval(timerInterval);
    displayResult("Quiz Cancelled");
}

// Restart the quiz
restartQuizButton.onclick = startQuiz;

// Cancel the quiz
cancelQuizButton.onclick = cancelQuiz;

// Submit the answer
submitAnswerButton.onclick = submitAnswer;

// Start the quiz when the document is ready
document.addEventListener("DOMContentLoaded", startQuiz);
