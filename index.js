
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//Create a new variable called level and start at level 0.
var level = 0;


//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$("body").keydown( function() {
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click( function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {

   //3. if statement to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

     //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
     if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout ( function() {
        nextSequence();
      }, 1000);

       }

     } else {
       playSound("wrong");
       $("body").addClass("game-over");
       $("#level-title").text("Game Over, Press any Key to Restart.")

       setTimeout ( function() {
         $("body").removeClass("game-over");
       }, 200);

       startOver();
     }
   }



function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //Increase the level by 1 every time nextSequence() is called.
  level++;
  //Update the h1 with this change in the value of level.
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
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


//Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
}
