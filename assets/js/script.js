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
var submitButton = document.getElementById("submitScore");
var highScores = document.getElementById("highscores");
var clearHighScoresButton = document.getElementById("clearHighScores");
var goBackButton = document.getElementById("goBack");
var goBackButton1 = document.getElementById("goBack1");

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
    document.getElementById("scoreInput").style.display = "block";
    document.getElementById("score").innerHTML = score;
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
    document.getElementById("scoreBox").style.display = "flex";
    var submitMessage = document.createElement("p");
    var submitText = document.createTextNode("Score saved!");
    submitMessage.appendChild(submitText);
    document.getElementById("scoreBox").appendChild(submitMessage);
    

}

function viewHighScores (event) {
    localStorage.getItem("highScores");
    document.getElementById("startBox").style.display = "none";
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("endBox").style.display = "none";
    document.getElementById("scoreBox").style.display = "none";
    document.getElementById("highscoreBox").style.display = "block";
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    for (var i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement("li");
        var scoreText = document.createTextNode(highScores[i].initials + ": " + highScores[i].score);
        scoreList.appendChild(scoreText);
        document.getElementById("highScoreList").appendChild(scoreList);
    }
}

function clearHighScores (event) {
    event.preventDefault();
    localStorage.clear();
    document.getElementById("highScoreList").innerHTML = "";
}

function goBack (event) {
    event.preventDefault();
    window.location.href = "index.html";
}

function goBack1 (event) {
    event.preventDefault();
    window.location.href = "index.html";
}

startButton[0].addEventListener("click", startQuiz);
highScores.addEventListener("click", viewHighScores);
clearHighScoresButton.addEventListener("click", clearHighScores);
goBackButton.addEventListener("click", goBack);
goBackButton1.addEventListener("click", goBack1);

