window.onload = (function() {
  'use strict';
  var bar = document.getElementsByClassName('progress-bar')[0];
  var barProgress = document.getElementsByClassName('progress-bar-condition')[0];
  barProgress.style.width = 0;
  var count = 0; //progressbar count

  function Quize() {
    this.result = null;
    this.startGameBlock = document.getElementsByClassName('start-game')[0];
    this.playGameBlock = document.getElementsByClassName('play-game')[0];
    this.endGameBlock = document.getElementsByClassName('end-game')[0];
    this.startButton = document.getElementsByClassName('start')[0];
    this.yesButton = document.getElementsByClassName('yes')[0];
    this.noButton = document.getElementsByClassName('no')[0];
    this.score = document.getElementsByClassName('score')[0];
  }

  var quize = new Quize();
  
  function startGame () {
  	var startButton = quize.startButton;
    quize.playGameBlock.style.display = 'none';
    quize.endGameBlock.style.display = 'none';

    startButton.addEventListener("click", function() {
      getTask();
      updateProgressBar();
	  });
  }

	function getTask() {
    quize.startGameBlock.style.display = 'none';
    quize.playGameBlock.style.display = 'block';
    progress ();
    var a = getRandomInt(1,20);
    var b = getRandomInt(1,20);
    var result = a + b;

    var aValue = document.querySelector(".a-value");
    aValue.textContent = a;

    var bValue = document.querySelector('.b-value');
    bValue.textContent = b;

    var answer = document.querySelector('.answer');
    answer.textContent = result;

    // Quize.prototype.progressBar = document.getElementsByClassName('progress-bar')[0];
		console.log(a,b, result);
	}


  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function progress () {
    var yes = quize.yesButton;
    yes.addEventListener("click",yesClickEvent);
    quize.noButton.addEventListener("click", noClickEvent);
  }

  function noClickEvent() {
    updateProgressBarCount();
    checkIsRightAnsver(false);
  }

  function updateScore() {
    var score = quize.score;
    score++;
    // quize.score.textContent = score;
  }

  function yesClickEvent() {
    updateProgressBarCount();
    checkIsRightAnsver(true);
  }

  function updateProgressBarCount() {
    if (count > 0) {
        count =  count - (count / 2);
    }

  }

  function checkIsRightAnsver(is_yes) {
    var a = document.querySelector('.a-value').textContent;
    var b = document.querySelector('.b-value').textContent;
    var an = document.querySelector('.answer').textContent;


    a = parseInt(a); 
    b = parseInt(b);
    an = parseInt(an);

    if (is_yes) {
      if (a + b ==  an) {
        updateScore();
        return getNextTask();
      }
      return triggerEndGame();
    } else {
      if (a + b !=  an) {
        updateScore();
        return getNextTask();
      }
      return triggerEndGame();
    }

  }

  function getNextTask() {
    return getTask();
  }

  function triggerEndGame() {
    quize.playGameBlock.style.display = 'block';
    quize.endGameBlock.style.display = 'none';
    quize.score = 0;
  }
   
  function updateProgressBar() {
    var count = 0;
    var interval = setInterval(function() {
      if (count >= 100) {
        clearInterval(interval);
        return triggerEndGame();
      }
      count++;
      console.log(count);
      barProgress.style.width = count + '%';
    }, 0);
  }
  
  startGame ();
  
      
 });