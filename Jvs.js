// Bringing together all HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// The Quiz question object
var quizQuestions = [{
    question: "How many Questions can you pick?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c"
},
{
    question: "When did ww2 begin?",
    choiceA: "1932",
    choiceB: "1924",
    choiceC: "1936",
    choiceD: "1939",
    correctAnswer: "d"
},
{
    question: "When did ww1 begin?",
    choiceA: "1905",
    choiceB: "1920",
    choiceC: "1939",
    choiceD: "1914",
    correctAnswer: "d"
},
{
    question: "When did the cold war end?",
    choiceA: "1945",
    choiceB: "1965",
    choiceC: "1972",
    choiceD: "1991",
    correctAnswer: "d"
},
{
    question: "WHo did the U.s fight in the Vietnam war?",
    choiceA: "Germany",
    choiceB: "Russia",
    choiceC: "Vietcong",
    choiceD: "Italy",
    correctAnswer: "c"
},
{
    question: "When was the U.s founded as an independent country?",
    choiceA: "1446",
    choiceB: "1782",
    choiceC: "1776",
    choiceD: "1945",
    correctAnswer: "c"
},
{
    question: "Who did America gain independence from?",
    choiceA: "China",
    choiceB: "Great Britian",
    choiceC: "Ethiopia",
    choiceD: "North Korea",
    correctAnswer: "b"
},


];
// These are the Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 56;
var timerInterval;
var score = 0;
var correct;

// This specific function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz button will start the TimeRanges and will hide the start button, as well as displays the first quiz question.
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //The Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On clicking the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in the local storage
// as well as pushing the new user name and score into the array we are saving in local storage. After that it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This specific function displays the high scores page while hiding all of the other pages from 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function is going to check the response to each answer 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that answer is wrong.
    } else {
        showScore();
    }
}

// This button is going to start the quiz!
startQuizButton.addEventListener("click", startQuiz);