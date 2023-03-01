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
//Use jQuery to re-write variables
const timer = $('#timer');
//document.querySelector("#timer");
const timeLeft = $('#timeLeft');
//document.querySelector("#timeLeft");
const timesUp = $('#timesUp');
//document.querySelector("#timesUp");
const mainArea = $('#mainArea');
//document.querySelector("#mainArea");

const start = $('#start');
//document.querySelector("#start");
const startQuizButton = $('#startQuizButton');
//document.querySelector("#startQuizButton");

const questionDiv = $('#questionDiv');
//document.querySelector("#questionDiv");
const questionTitle = $('#questionTitle');
//document.querySelector("#questionTitle");
const choiceA = $('#btn-0');
//document.querySelector("#btn-0");
const choiceB = $('#btn-1');
//document.querySelector("#btn-1");
const choiceC = $('#btn-2');
//document.querySelector("#btn-2");
const choiceD = $('#btn-3');
//document.querySelector("#btn-3");
const answerCheck = $('#answerCheck');
//document.querySelector("#answerCheck");

const summary = $("#summary");
const initialInput = $("#initialInput");
const submitInitialButton = $("#submitInitialButton");

const finalScore = $("#finalScore");
const highScoresSection = $("#highScoresSection");

const goBackButton = $("#goBackButton");
const clearHighScoresButton = $("#clearHighScoresButton");

const listOfHighScores = $("#listOfHighScores");
const highscores = $("#highscores");

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

    start.hide();
    questionDiv.show();
    timer.show();
    timesUp.hide();
    // start.style.display = "none";
    // questionDiv.style.display = "block";
    // timer.style.display = "block";
    // timesUp.style.display = "none";

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
    //.textContent is replaced with .text() & place content inside ()
    questionTitle.text(questions[questionIndex].question);
    choiceA.text(questions[questionIndex].choices[0]);
    choiceB.text(questions[questionIndex].choices[1]);
    choiceC.text(questions[questionIndex].choices[2]);
    choiceD.text(questions[questionIndex].choices[3]);
}

//To check if the question logs with answer choices
// console.log(questions[questionIndex].question);
// console.log(questions[questionIndex].choices);

//enable choosing answer choices for each question & checking correct answer
//answer is what the user chooses

function checkAnswer (answer) {
    const lineBreak = $("#lineBreak");
    lineBreak.show()
    answerCheck.show()
    //correct answer
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
    correctAns++;
    answerCheck.text("Correct");
    //wrong answer
    } else {
    totalTime--;
    totalTime -= 10;
    answerCheck.text("Wrong");
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
    
    summary.show();
    questionDiv.hide();
    start.hide();
    timer.hide();
    timesUp.show();
    // summary.style.display = "block";
    // questionDiv.style.display = "none";
    // start.style.display = "none";
    // timer.style.display = "none";
    // timesUp.style.display = "block";

    finalScore.text(correctAns);
}

//local storage of high scores
//local storage does not work
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

    let saveHighScores = localStorage.getItem("High Scores");

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

//It does not scope storedHighScores in the event listeners?
//Can I fix it by repeating it outside the showHighScores

//Event listeners
//Can I make this happen with a single event listener?
//addEventListener is replaced with on
startQuizButton.on("click", newQuiz);

choiceA.on("click", chooseA);
choiceB.on("click", chooseB);
choiceC.on("click", chooseC);
choiceD.on("click", chooseD);

submitInitialButton.on("click", function(event){showHighScores(event)});
highscores.on("click", function(event){showHighScores(event)});

goBackButton.on("click", function(){
    start.style.display = "block";
    highScoresSection.style.display = "none"; 
})

clearHighScoresButton.on("click", function(){window.localStorage.removeItem("High Scores");})
