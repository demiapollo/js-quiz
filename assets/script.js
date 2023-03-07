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

//Create variables with const by connecting to corresponding html elements - Use jQuery 
const timer = $('#timer');
const timeLeft = $('#timeLeft');
const timesUp = $('#timesUp');
const mainArea = $('#mainArea');

const start = $('#start');
const startQuizButton = $('#startQuizButton');

const questionDiv = $('#questionDiv');
const questionTitle = $('#questionTitle');
const choiceA = $('#btn-0');
const choiceB = $('#btn-1');
const choiceC = $('#btn-2');
const choiceD = $('#btn-3');
const answerCheck = $('#answerCheck');

const summary = $("#summary");
const initialInput = $("#initialInput");
const submitInitialButton = $("#submitInitialButton");

const finalScore = $("#finalScore");
const highScoresSection = $("#highScoresSection");

const goBackButton = $("#goBackButton");
const clearHighScoresButton = document.querySelector('#clearHighScoresButton');
//$("#clearHighScoresButton");

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
    timeLeft.text(totalTime);
    initialInput.text('');

    start.hide();
    questionDiv.show();
    timer.show();
    timesUp.hide();
    summary.hide();

    let startTimer = setInterval (function() {
        totalTime--;
        timeLeft.text(totalTime);
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

//enable choosing answer choices for each question & checking correct answer

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
   
    finalScore.text(correctAns);
}

let saveHighScores = JSON.parse(localStorage.getItem("HighScores")) || [];

//local storage of high scores 
function saveScores(event) {
    event.preventDefault();
    if (initialInput.val() === '') {
        alert('Please submit your initials.');
        return;
    }

    start.hide();
    summary.show();
    timer.show();
    questionDiv.hide();
    timesUp.hide();
    highScoresSection.show();

    let user_n_Score = {
        inititals: initialInput.val(),
        score: correctAns
    };
    console.log(user_n_Score);
    
    
    saveHighScores.push(user_n_Score);
    // console.log(saveHighScores, 'to see what is saved');
   
    // let scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem('HighScores', JSON.stringify(saveHighScores));

    showHighScores();
}

let i = 0 
function showHighScores() {
    
    start.hide();
    summary.hide();
    timer.show();
    questionDiv.hide();
    timesUp.hide();
    highScoresSection.show();

    if (saveHighScores.length > 0) {
        // console.log(saveHighScores.length, 'initials & recorded scores');
    for (let i=0; i < saveHighScores.length; i++) {
        let newHighScore = $('<div>');
        newHighScore.html(`${saveHighScores[i].inititals} ${saveHighScores[i].score}`);
        listOfHighScores.prepend(newHighScore);
    }
}
}

//Event listeners
//Can I make this happen with a single event listener?
startQuizButton.on("click", newQuiz);

choiceA.on("click", chooseA);
choiceB.on("click", chooseB);
choiceC.on("click", chooseC);
choiceD.on("click", chooseD);

submitInitialButton.on("click", saveScores);
highscores.on("click", showHighScores);

goBackButton.on("click", function(){
    
    start.show();
    highScoresSection.hide();
    listOfHighScores.empty();
})

//clear high scores btn does not work
//start quiz after clicking back does not work
// clearHighScoresButton.on("click", ); //clear btn still does not work
clearHighScoresButton.addEventListener("click", function () {
    localStorage.removeItem('HighScores');
});