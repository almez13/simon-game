var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

//Detect only first keypress (usr "one" instead "on") and call NextSequence
//$(document).one('keydown', function(event) { 

$(document).on('keydown', function() { 
  //this chek the start of the game
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Click buttons
$(".btn").on("click", function() {
  //var userChosenColour = this.id; Alternative way
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // activate function PlaySound
  playSound(userChosenColour);
  //Animation when user click buttons
  animatePress(userChosenColour);
  // Call checkAnswer() after a user has clicked and chosen the answer, we are looking at the last value in array (that is why length-1)
  checkAnswer(userClickedPattern.length-1);
   //Control
  console.log(userChosenColour);
  console.log(userClickedPattern);
});

//Function that starts the game
function nextSequence() {
  //when we call this function UserClickedPattern became empty, so we can build new array and check the game
  userClickedPattern = [];
   //When the game started it change the No of level if nextSecuence called
   level++;
   $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); 
  var randomChosenColour = buttonColours[randomNumber];  
  gamePattern.push(randomChosenColour);
  // Start animation of buttons
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // activate function PlaySound
  playSound(randomChosenColour); 
 
  //Control
  console.log(randomNumber);
  console.log(randomChosenColour);
  console.log(gamePattern);
}

//Call sound function
function playSound(name) {
  //name is var which determined in functions above.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Call animation function
function animatePress(currentColour) {
  //add and remove classes without "."
  $("#" + currentColour).addClass("pressed");
  //this function remove the class which was added in 100 ms
  setTimeout(function() {
  $("#" + currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel) {
  //we check if the last user answer is equal to the gamePattern
  if ( gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //Next if - the additional control of the length of all answers
    if (userClickedPattern.length === gamePattern.length) {
    // then we call the nextSequence function to continue the game 
      setTimeout(function () {
      nextSequence();
      }, 1000);
    }
  } else {    
    console.log("wrong");
    //if wrong play special signal
    playSound("wrong");    
    // if wrong red color allert
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Change the h1 title
    $("#level-title").html("Game Over, Press Any Key to Restart");
    // Call the function to reload the game  
    startOver();  
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}