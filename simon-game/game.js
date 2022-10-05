
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var level = 0;


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level ++;
    $('#level-title').text('Level ' + level)
}


$('.btn').on('click', function(event) {
    var userChosedColor = this.id;
    userClickedPattern.push(userChosedColor);
    playSound(userChosedColor);
    animationPress(userChosedColor);
    lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
    console.log(userClickedPattern);
});

function playSound(sound){
    var soundPlayed = new Audio('sounds/' + sound + '.mp3');
    soundPlayed.play()
}

function animationPress(currentColor) {
    $('#'+currentColor).addClass('pressed');
    setTimeout(function() {$('#'+currentColor).removeClass('pressed')}, 100)
}

$(document).on('keydown', function() {
    if (level == 0){
        nextSequence();
    }
    else {
        console.log(this.key);
    }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log('success');
        if (gamePattern.length == userClickedPattern.length){

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }

    else {
        var wrong = new Audio('sounds/wrong.mp3')
        wrong.play()
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any to Restart');
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}