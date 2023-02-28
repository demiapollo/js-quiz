//Create an objects that contains questions, answer choices, and correct answer
const questions = [
    {
        question: "When was ES6 JavaScript introduced?",
        choices: ["a) 2015", "b) 2020", "c) 1998", "d) 2009"],
        answer: "a) 2015"
    },
    {
        question: "According to the Stack Overflow survey conducted in 2022, which of the following programming language is the most popular among developers?",
        choices: ["a) Python", "b) JavaScript", "c) HTML", "d) Julia"],
        answer: "b) JavaScript"
    },
    {
        question: "What is the % operator called in JavaScript?",
        choices: ["a) Exponentiation", "b) Modulo", "c) Decrement", "d) Ternary"],
        answer: "b) Modulo"
    },
    {
        question: "Which of the following was introduced by ES6?",
        choices: ["a) Function declaration", "b) Arrow function syntax", "c) For loop", "d) Assignment operator"],
        answer: "b) Arrow function syntax"
    },
    {
        question: "Which operator do we use to learn the type of a variable in JavaScript?",
        choices: ["a) let", "b) typeof", "c) boolean", "d) typeOf"],
        answer: "b) typeof"
    }
];

//Create variables with const by connecting to corresponding html elements
const timer = document.querySelector("#timer");
const timeLeft = document.querySelector("#timeLeft");
const timesUp = document.querySelector("#timesUp");

const mainArea = document.querySelector("#mainArea");

const start = document.querySelector("#start");
const startQuizButton = document.querySelector("#startQuizButton");

const questionDiv = document.querySelector("#questionDiv");
const questionTitle = document.querySelector("#questionTitle");
const choiceA = document.querySelector("#btn-0");
const choiceB = document.querySelector("#btn-1");
const choiceC = document.querySelector("#btn-2");
const choiceD = document.querySelector("#btn-3");
const answerCheck = document.querySelector("#answerCheck");

const summary = document.querySelector("#summary");
const initialInput = document.querySelector("#initialInput");
const submitInitialButton = document.querySelector("#submitInitialButton");

const finalScore = document.querySelector("#finalScore");
const highScoresSection = document.querySelector("#highScoresSection");

const goBackButton = document.querySelector("#goBackButton");
const clearHighScoresButton = document.querySelector("#clearHighScoresButton");

const listOfHighScores = document.querySelector("#listOfHighScores");
const highscores = document.querySelector("#highscores");

//other variables needed
let correctAns = 0;
let questionNum = 0;
let questionIndex = 0;
let scoreResult = 0;

//functions to start timer after clicking start
let totalTime = 100;

function newQuiz() {
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    start.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    let startTimer = setInterval (function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if(questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);
    showQuiz();
}; 

//show questions and answer choices
function showQuiz () {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

//To check if the question logs with answer choices
// console.log(questions[questionIndex].question);
// console.log(questions[questionIndex].choices);

//enable choosing answer choices for each question & checking correct answer
//answer is what the user chooses

function checkAnswer (answer) {
    const lineBreak = document.querySelector("#lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";
    //correct answer
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
    correctAns++;
    answerCheck.textContent = "Correct";
    //wrong answer
    } else {
    totalTime--;
    totalTime -= 10;
    answerCheck.textContent = "Wrong";
    }
    //same process for next questions
    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() {checkAnswer(0);}
function chooseB() {checkAnswer(1);}
function chooseC() {checkAnswer(2);}
function chooseD() {checkAnswer(4);}

//game over function - no time left or all questions are answered
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    start.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns;
}

//local storage of high scores
function saveScores(event) {
    event.preventDefault();
    if (initialInput.value === '') {
        alert('Please submit your initials.');
        return;
    }

    start.style.display = "none";
    summary.style.display = "block";
    timer.style.display = "block";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    highScoresSection.style.display = 'block';

    let saveHighScores = localStorage.getItem("High Scores");
    let scoresArray;

    if (saveHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(saveHighScores);
    }

    let user_n_Score = {
        inititals: initialInput.value,
        score: finalScore.textContent 
    };

    console.log(user_n_Score);
    scoresArray.push(user_n_Score);

    showHighScores();
}

// let i = 0 
function showHighScores() {
    start.style.display = "none";
    summary.style.display = "block";
    timer.style.display = "block";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    highScoresSection.style.display = 'block';

    if (saveHighScores === null) {
        return;
    } 

    let storedHighScores = JSON.parse(saveHighScores);
    for (i=0, i < storedHighScores.length; i++;) {
        let newHighScore = document.createElement('p');
        newHighScore.innerHTML = storedHighScores[i].inititals + storedHighScores[i].score;
        listOfHighScores.appendChild(newHighScore);

    }
}

//Event listeners
startQuizButton.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialButton.addEventListener("click", function(event){storedHighScores(event)});
highscores.addEventListener("click", function(event){showHighScores(event)});

goBackButton.addEventListener("click", function(){
    start.style.display = "block";
    highScoresSection.style.display = "none"; 
})

clearHighScoresButton.addEventListener("click", function(){window.localStorage.removeItem("High Scores");})
