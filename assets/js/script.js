function multipleChoiceQuiz (title, choices, correct) {
    this.title = title;
    this.choices = choices;
    this.correct = correct;
}

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
var highScores = document.getElementsByClassName("highScores");
var initials = document.getElementsByClassName("initials");
var timer = document.getElementById("timer");
var question = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var score = document.getElementById("score");
var finalScore = document.getElementById("finalScore");
var submitButton = document.getElementsByClassName("submitButton");
var highScores = document.getElementsByClassName("highScores");
var clearButton = document.getElementsByClassName("clearButton");
var goBackButton = document.getElementsByClassName("goBackButton");

var currentQuestion = 0;
var score = 0;
var timer;
var interval;

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

function endQuiz () {
    clearInterval(interval);
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("endBox").style.display = "block";
    document.getElementById("finalScore").innerHTML = score;
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