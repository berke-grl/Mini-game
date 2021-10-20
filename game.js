var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var isStarted = false;

var level = 0;

$(".btn").on("click", function (event) {
    //console.log(event.target.id);
    var pressedColor = event.target.id;
    userClickedPattern.push(pressedColor);

    playSound(pressedColor);
    animatePress(pressedColor);

    checkAnswer(userClickedPattern.length - 1);

});

$(document).on("keypress", function (event) {
    //console.log(event.key);
    if (!isStarted) {
        nextSequence();
        isStarted = true;

    }

})


function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

        console.log("success");

        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isStarted = false;
}