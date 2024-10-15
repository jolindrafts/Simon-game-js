var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var game_start = false;

var level = 0;

var index = -1;

$(document).on("keypress", function () {
  if (game_start == false) {
    nextSequence();
  }
  game_start = true;
});

$(".btn").on("click", function () {
  index += 1;
  console.log("awal" + index);
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(index);
});

function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
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
  console.log("function" + index);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("true");
    if (gamePattern.length == userClickedPattern.length) {
      userClickedPattern.length = 0;
      userClickedPattern.splice(0, userClickedPattern.length);
      index = -1;
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("false");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  gamePattern.splice(0, gamePattern.length);
  userClickedPattern.length = 0;
  userClickedPattern.splice(0, userClickedPattern.length);
  index = -1;
  game_start = false;
}
