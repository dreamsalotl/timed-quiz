function multipleChoiceQuiz (title, choices, correct) {
    this.title = title;
    this.choices = choices;
    this.correct = correct;
}

// Set Variables for quiz questions --------------------

var questions = [
    new multipleChoiceQuiz("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
    new multipleChoiceQuiz("The condition in an if / else statement is enclosed within ____.", ["quotes", "curly brackets", "parentheses", "square brackets"], "parentheses"),
    new multipleChoiceQuiz("Arrays in JavaScript can be used to store ____.", ["numbers and strings", "other arrays", "booleans", "all of the above"], "all of the above"),
    new multipleChoiceQuiz("String values must be enclosed within ____ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parentheses"], "quotes"),
    new multipleChoiceQuiz("A very useful tool used during development and debugging for printing content to the debugger is:", ["JavaScript", "terminal / bash", "for loops", "console.log"], "console.log")
];

var startButton = document.getElementsByClassName("startButton");
var startBox = document.getElementsByClassName("startBox");
var quizBox = document.getElementsByClassName("quizBox");
var endBox = document.getElementsByClassName("endBox");
var initials = document.getElementsByClassName("initials");
var finalScore = document.getElementById("finalScore");
var submitButton = document.getElementsByClassName("submitScore");
var highScores = document.getElementsByClassName("highScores");

// Set Variables for quiz progress --------------------

var currentQuestion = 0;
var score = 0;
var timer;
var interval;
var newScore;

// Set Functions for quiz progress --------------------

function startQuiz (event) {
    event.preventDefault();
    document.getElementById("startBox").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    timer = 75;
    interval = setInterval(function() {
        timer--;
        document.getElementById("timer").innerHTML = timer;
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
    nextQuestion();
}

function nextQuestion () {
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerHTML = questions[currentQuestion].title;
        document.getElementById("answer1").innerHTML = questions[currentQuestion].choices[0];
        document.getElementById("answer2").innerHTML = questions[currentQuestion].choices[1];
        document.getElementById("answer3").innerHTML = questions[currentQuestion].choices[2];
        document.getElementById("answer4").innerHTML = questions[currentQuestion].choices[3];
    } else {
        endQuiz();
    }
    answer1.addEventListener("click", checkAnswer);
    answer2.addEventListener("click", checkAnswer);
    answer3.addEventListener("click", checkAnswer);
    answer4.addEventListener("click", checkAnswer);
    
}

function checkAnswer (event) {
    event.preventDefault();
    if (event.target.innerHTML === questions[currentQuestion].correct) {
        score++;
        document.getElementById("score").innerHTML = score;
    } else {
        timer -= 10;
    }
    currentQuestion++;
    nextQuestion();
}

// Set Functions for quiz end and score display --------------------

function endQuiz () {
    clearInterval(interval);
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("endBox").style.display = "flex";
    document.getElementById("scoreBox").style.display = "flex";
    document.getElementById("highScoreBox").style.display = "flex";
    document.getElementById("finalScore").innerHTML = score;
    submitButton.addEventListener("click", saveScore);
}

function saveScore (event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value;
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = {
        score: score,
        initials: initials
    };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
    document.getElementById("scoreBox").style.display = "flex";
}

function viewHighScores (event) {
    event.preventDefault();
    window.location.href = "highscores.html";
}

function clearHighScores (event) {
    event.preventDefault();
    localStorage.clear();
    document.getElementById("highScores").innerHTML = "";
}

function goBack (event) {
    event.preventDefault();
    window.location.href = "index.html";
}

startButton[0].addEventListener("click", startQuiz);