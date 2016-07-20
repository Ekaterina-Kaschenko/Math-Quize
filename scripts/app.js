window.onload = (function() {
  'use strict';
  // var count;

  function Quize() {
    this.result = null;
    this.mistakenResult = null;
    this.startGameBlock = document.getElementsByClassName('start-game')[0];
    this.playGameBlock = document.getElementsByClassName('play-game')[0];
    this.endGameBlock = document.getElementsByClassName('end-game')[0];
    this.startButton = document.getElementsByClassName('start')[0];
    this.yesButton = document.getElementsByClassName('yes')[0];
    this.noButton = document.getElementsByClassName('no')[0];
    this.score = document.getElementsByClassName('score')[0];
    this.bar = document.getElementsByClassName('progress-bar')[0];
    this.barProgress = document.getElementsByClassName('progress-bar-condition')[0];
    
  }

  var quize = new Quize();
  
  function startGame () {
  	var startButton = quize.startButton;
    quize.playGameBlock.style.display = 'none';
    quize.endGameBlock.style.display = 'none';

    startButton.addEventListener("click", function() {
      getTask();
      quize.score = 0;
	  });
  }

	function getTask() {
    quize.startGameBlock.style.display = 'none';
    quize.playGameBlock.style.display = 'block';
    progressBar ();
    var a = getRandomInt(1,20);
    var b = getRandomInt(1,20);
    quize.result = a + b;
    quize.mistakenResult  = getRandomInt(1,20);

    var aValue = document.querySelector(".a-value");
    aValue.textContent = a;

    var bValue = document.querySelector('.b-value');
    bValue.textContent = b;

    var answer = document.querySelector('.answer');
    answer.textContent = randomAnswer(quize.result, quize.mistakenResult);

    quize.yesButton.addEventListener('click', function () {
      getTask();
      checkCorrectAnswer (a, b, quize.result);
      randomAnswer(quize.result, quize.mistakenResult);
    });

  }

  function checkCorrectAnswer (a, b, answer) {
    if (a + b == answer) {
      console.log('success');
    } else {
      console.log('error');
    }
    console.log(a,b, answer);
  }

  function randomAnswer (result, mistakenResult) {
    var index = Math.random().toFixed(1);
    if (index < 0.5) {
        console.log(index,'result', result);
        return result;
    } else {
        console.log(index,'errorResult', mistakenResult);
        return mistakenResult;
    }
  }


  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }


    // var yes = quize.yesButton;
    // yes.addEventListener("click",yesClickEvent);
    // quize.noButton.addEventListener("click", function () {
    //   if (a + b == answer) {
    //     console.log('great job');
    //   } else {
    //     console.log('error');
    //   }
    // });



  // function progress () {
  //   var yes = quize.yesButton;
  //   yes.addEventListener("click",yesClickEvent);
  //   quize.noButton.addEventListener("click", noClickEvent);
  // }



  // function checkIsRightAnsver(is_yes) {
  //   var a = document.querySelector('.a-value').textContent;
  //   var b = document.querySelector('.b-value').textContent;
  //   var an = document.querySelector('.answer').textContent;


  //   a = parseInt(a); 
  //   b = parseInt(b);
  //   an = parseInt(an);

  //   if (is_yes) {
  //     if (a + b ==  an) {
  //       return getNextTask();
  //     }
  //     return triggerEndGame();
  //   } else {
  //     if (a + b !=  an) {
  //       return getNextTask();
  //     }
  //     return triggerEndGame();
  //   }

  // }


  function triggerEndGame() {
    quize.playGameBlock.style.display = 'block';
    quize.endGameBlock.style.display = 'none';
    quize.score = 0;
  }
   
  function progressBar() {
    var count = 0;
    var barProgress =  quize.barProgress;
    barProgress.style.width = 0;
    var interval = setInterval(function() {
      if (count >= 100) {
        clearInterval(interval);
        return triggerEndGame();
      }
      count++;
      barProgress.style.width = count + '%';
    }, 0);
  }
  
  startGame ();
  
      
 });



  // function noClickEvent() {
  //   updateProgressBarCount();
  //   // checkIsRightAnsver(false);
  // }


  // function yesClickEvent() {
  //   updateProgressBarCount();
  //   // checkIsRightAnsver(true);
  // }

  // function updateProgressBarCount() {
  //   if (count > 0) {
  //       count =  count - (count / 2);
  //   }

  // }