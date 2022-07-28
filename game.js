var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Triggers the nextSequence function when a key is pressed for the first time.
$(document).keypress(function() {
  if (started == false) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  // Resets the userClickedPattern each time nextSequence is run.
  userClickedPattern = [];

  level = level + 1;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Causes the appropriate button to blink.
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Plays the appropriate sound for the random button that was selected.
  playSound(randomChosenColour);
}


// This is what to do whenever a button is clicked by the user.
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  // Plays the appropriate sound for the button that the user clicked.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});



// Creates the function that plays sound, which is compatible with both the random sequence and the user's clicks.
function playSound(name) {
  // Plays the appropriate sound for the button.
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


// Adds an animation when the
function animatePress(currentColour) {
  // Adds the class "pressed" to the button that was clicked by the user.
  $("#"+currentColour).addClass("pressed");

  // Removes the class "pressed" from the same button after 0.1 seconds.
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])  {
    console.log("success");

    // Checks if the sequence is complete. If so, runs nextSequence again after 1 second.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    new Audio("sounds/wrong.mp3").play();
    $("#level-title").text("Game Over, Press Any Key to Restart")

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Restarts the game when the user inputs the wrong answer.
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
