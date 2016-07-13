window.onload = (function() {
  'use strict';

  function Quize() {
  	console.log('hello');
    this.result = null;
    this.startGame();
  }

  Quize.prototype.startGame = function() {
    this.startGameElem = document.getElementsByClassName('start-game')[0].style.display = 'block';
    this.playGameElem = document.getElementsByClassName('play-game')[0].style.display = 'none';
    this.endGameElem = document.getElementsByClassName('end-game')[0].style.display = 'none';
  	this.start = document.getElementsByClassName('start')[0];
  	this.start.addEventListener("click", function() {
      Quize.prototype.getTask();
	  });
  };

	Quize.prototype.getTask = function(a,b) {
    this.startGameElem = document.getElementsByClassName('start-game')[0].style.display = 'none';
    this.playGameElem = document.getElementsByClassName('play-game')[0].style.display = 'block';
    this.endGameElem = document.getElementsByClassName('end-game')[0].style.display = 'none';
    var a = getRandomInt(1,20);
    var b = getRandomInt(1,20);
    var result = a + b;
    // this.aValue = document.getElementsByClassName('a-value')[0].innerHTML;
    // this.aValue = a;
    var aValue = document.querySelector(".a-value");
    aValue.textContent = a;

    var bValue = document.querySelector('.b-value');
    bValue.textContent = b;

    var answer = document.querySelector('.answer');
    answer.textContent = result;
		
    
    this.progressBar = document.getElementsByClassName('progress-bar')[0];

		console.log(a,b, result);
	};
  Quize.prototype.trackDOM = function() {
    //
  };

  Quize.prototype.endTask = function() {
    this.startGameElem = document.getElementsByClassName('start-game')[0].style.display = 'none';
    this.playGameElem = document.getElementsByClassName('play-game')[0].style.display = 'none';
    this.endGameElem = document.getElementsByClassName('end-game')[0].style.display = 'block';
  };

  
  var quize = new Quize();

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function progress () {
    var yes = document.getElementsByClassName('yes')[0];
    var bar = document.getElementsByClassName('progress-bar')[0];
    var barProgress = document.getElementsByClassName('progress-bar-condition')[0];
    barProgress.style.width = 0;

    yes.addEventListener("click", function() {
      var count = 0;
      var interval = setInterval(function() {
        if (count >= 100) {
          clearInterval(interval);
          return;
        }
        count++;
        barProgress.style.width = count + '%';
      }, 50);

    });
  }

  progress ();
  

 });