var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false


function nextSequence() {
    userClickedPattern = []
    level ++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

   playSound(randomChosenColour);
   animatePress(randomChosenColour);

   
}   

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    var audio = new Audio ("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true
    }
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();}, 1000) 
        }
    }
    else{console.log("Wrong");
    var wrong = new Audio("./sounds/wrong.mp3")
    wrong.play();
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")  
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
};
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;

}