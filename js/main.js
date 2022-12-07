let currentRoundIndex = 0;
let currentQuestionIndex = 0;
let currentScore = 0;

$(document).ready(function() {
    $("#play-game-button").click(function() {
        $("#title-screen").hide();
        loadRound(0);
        $("#current-score-wrapper").show();
        $("#game-screen").show();
    });

    $("#answer-choice-1").click(function() {
        answerChoiceClicked(0);
    });

    $("#answer-choice-2").click(function() {
        answerChoiceClicked(1);
    });

    $("#answer-choice-3").click(function() {
        answerChoiceClicked(2);
    });

    $("#next-question-button").click(function() {
        if (currentQuestionIndex == 2) {
            if (currentRoundIndex == 2) {
                $("#game-screen").hide();
                $("#final-score").html(currentScore);
                $("#ending-screen").show();
            } else {
                loadRound(++currentRoundIndex);
            }
        } else {
            loadQuestion(currentRoundIndex, ++currentQuestionIndex);
        }
        $("#next-question-button").hide();
    });

    $("#play-again-button").click(function() {
        currentScore = 0;
        currentRoundIndex = 0;
        currentQuestionIndex = 0;
        loadRound(0);
        $("#current-score").html(0);
        $("#ending-screen").hide();
        $("#game-screen").show();
    });
});

function answerChoiceClicked(index) {
    if (!$("#next-question-button").is(":visible")) {
        const currentQuestion = UI_DATA.rounds[currentRoundIndex].questions[currentQuestionIndex];
        highlightAnswers(currentQuestion);
        if (currentQuestion.correctAnswerIndex === index) {
            currentScore += currentQuestion.score;
            $("#current-score").html(currentScore);
        }
        $("#next-question-button").show();
    }
}

function highlightAnswers(question) {
    for (let i = 0; i < 3; i++) {
        if (question.correctAnswerIndex === i) {
            $(`#answer-choice-${i + 1}`).css("background-color", "green");
        } else {
            $(`#answer-choice-${i + 1}`).css("background-color", "red");
        }
    }
}

function loadRound(roundIndex) {
    const round = UI_DATA.rounds[roundIndex];
    $("#round-title").html(round.title);
    loadQuestion(roundIndex, 0);
    currentRoundIndex = roundIndex;
}

function loadQuestion(roundIndex, questionIndex) {
    const question = UI_DATA.rounds[roundIndex].questions[questionIndex];
    $("#current-question").html(question.question);
    for (let i = 0; i < question.answers.length; i++) {
        $(`#answer-choice-${i + 1}`).html(question.answers[i]);
        $(`#answer-choice-${i + 1}`).css("background-color", "white");
    }
    currentQuestionIndex = questionIndex;
}