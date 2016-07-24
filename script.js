"use strict";
(function(){
  console.log('working');

//global variables
var hero = $('<div class="hero">');
$('body').append(hero);


//instructions at beginning of game
var instructions = $('<div class="instructions">');
$('body').append(instructions);
instructions.html("Use Arrow Keys to Move<br/>Space Bar to Attack")
//remove instructions
setTimeout(function(){
  instructions.remove();
}, 3500)


//intervals for game check of functions
setInterval(moveHero, 20);
setInterval(attack, 100);
setInterval(collision, 20);
var keys = {}


//moving hero
//setting limits for up / down / left / right to be contained in background
// http://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});

function moveHero() {

    for (var direction in keys) {
        if (!keys.hasOwnProperty(direction)) continue;
        //move left
        if (direction == 37 && hero.position().left > -150) {
            hero.addClass('left');
            hero.addClass('runLeft');
            hero.animate({left: "-=10"}, 0);
        }

        //move right
        if (direction == 39 && hero.position().left < $(window).width()) {
            hero.removeClass('left');
            hero.removeClass('runLeft')
            hero.addClass('run')
            hero.animate({left: "+=10"}, 0);
        }
        //jumping
        if (direction == 38 && hero.position().top > $(window).height()) {
            hero.animate({top: "+10", bottom: "+10"}, 0);
        }
    }
}


//toggling class for attack, attack on space bar
function attack(){
  for (var direction in keys){
    if (!keys.hasOwnProperty(direction)) continue;

    if (direction == 32) {
      //disable run
      hero.removeClass('run')
      hero.removeClass('runLeft')

      if (hero.hasClass('left')){
        hero.toggleClass('attackleft')
      } else {
        hero.toggleClass('attack');
      }

      setTimeout (function(){
        if (hero.hasClass('left')){
          hero.toggleClass('attackleft');
        } else {
          hero.toggleClass('attack');
        }
      }, 100)
    }
  }
}


//collision detection / enemy dies if hero attacks
function collision() {
    // determining positions of hero and mud
  var currentMud = $('.mud')
  // for (var i = 0; i< currentMud.length; i++){ // alternative way of writing
  if (currentMud.length){

    var heroPos = hero.offset().left; //checks for width + width of hero class
    var mudPos = currentMud.offset().left;

    if (mudPos - (heroPos + 469) < 0 && $('div').hasClass('attack') ){ //adds width of that particular image

      console.log('hit');
      currentMud.addClass('mudDeath');

      setTimeout(function(){ //removes mud after death
        currentMud.remove();
      }, 100);

      currentMud = $('.mud'); // this keeps checking for all mudes
    }
    else if (mudPos - (heroPos + 219) < 0 && mudPos ) { //adds width of that particular image

      console.log("GAME OVER");
      hero.addClass('defeat');
      // currentMud.stop(); //to stop animation

      setTimeout(function(){
        hero.remove();
      }, 3000);

    }
  }
}


// creating enemy
function makeMud(){
  var mud = $('<div class="mud">')
  $('body').append(mud);
};

//needed to change the interval of setinterval thats running, got this code from:
// http://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running
var counter = 5000;

var moveMud = function(){
  makeMud()
  $('.mud').animate({left: "-150"}, 4000); //1000 is how fast is move across the screen


  if (counter>100){
    counter=counter-10; // how fast enemies appear
  }

  clearInterval(interval);
  interval = setInterval(moveMud, counter);
}
var interval = setInterval(moveMud, counter);









})();
