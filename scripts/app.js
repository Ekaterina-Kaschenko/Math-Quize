window.onload = (function () {
  'use strict';
  var count = 0;
  var interval = null;

  function Quize() {
    this.aValue = null;
    this.bValue = null;
    this.result = null;
    this.operation = null;
    this.mistakenResult = null;
    this.answer = null;
    this.score = null;
    this.startGameBlock = document.getElementsByClassName('start-game')[0];
    this.playGameBlock = document.getElementsByClassName('play-game')[0];
    this.endGameBlock = document.getElementsByClassName('end-game')[0];
    this.startButton = document.getElementsByClassName('start')[0];
    this.yesButton = document.getElementsByClassName('yes')[0];
    this.noButton = document.getElementsByClassName('no')[0];
    this.scoreElem = document.getElementsByClassName('score')[0];
    this.bar = document.getElementsByClassName('progress-bar')[0];
    this.barProgress = document.getElementsByClassName('progress-bar-condition')[0];
    this.restartButton = document.getElementsByClassName('restart')[0];
  }

  var quize = new Quize();

  function startGame() {
    showBlock(quize.playGameBlock);
    quize.score = 0;
    getTask();
    
    if (interval !== null) {
      clearInterval(interval);
    }

    count = 0;
    var barProgress = quize.barProgress;
    barProgress.style.width = 0;

    interval = setInterval(function () {
      if (count >= 100) {
        clearInterval(interval);
        interval = null;
        endGame();
      }
      count++;
      barProgress.style.width = count + '%';
    }, 100);
  }

  function getOperation () {
    var operations = ['+', '-', '/', '*' ];
    var randomOperation = operations[Math.floor(Math.random() * operations.length)];
    return randomOperation;
  }

  function getTask() {
    resetProgressBar();
    var a = getRandomInt(1, 20);
    quize.aValue = a;
    var b = getRandomInt(1, 20);
    quize.bValue = b;
    quize.operation = getOperation();
    quize.result = getExample (a,b,quize.operation);
    console.log(a, quize.operation, b, ' = ', quize.result);
    quize.mistakenResult = getRandomInt(1, 20);

    var aValue = document.querySelector(".a-value");
    aValue.textContent = a;
    var bValue = document.querySelector('.b-value');
    bValue.textContent = b;
    var operationValue = document.querySelector('.operation');
    operationValue.textContent = quize.operation;
    var answer = document.querySelector('.answer');
    quize.answer = randomAnswer(quize.result, quize.mistakenResult);
    answer.textContent = quize.answer;
  }

  quize.startButton.addEventListener("click", function () {
    startGame();
  });

  quize.yesButton.addEventListener('click', function () {
    checkCorrectAnswer(quize.aValue, quize.bValue, quize.answer, true);
    getTask();
  });

  quize.noButton.addEventListener('click', function () {
    checkCorrectAnswer(quize.aValue, quize.bValue, quize.answer, false);
    getTask();
  });

  quize.restartButton.addEventListener('click', function () {
    startGame();
  });

  function checkCorrectAnswer(a, b, answer, button) {
    var codition = eval(a + quize.operation + b);
    if (((codition == answer) && (button === true)) || ((codition != answer) && (button === false))) {
      console.log(a + ' ' + quize.operation + ' ' + b + ' = ' + answer + ' - success, press ' + button + ' correct answer = ' + quize.result);
      quize.score++;
      console.log(quize.score);

    } else {
      console.log(a + ' ' + quize.operation + ' ' + b + ' = ' + answer + ' - error, press ' + button + ' correct answer = ' + quize.result);
      endGame();
    }
 }

  function randomAnswer(result, mistakenResult) {
    var index = Math.random().toFixed(1);
    if (index < 0.5) {
      return result;
    } else {
      return mistakenResult;
    }
  }

  function getExample (a,b,operation) {
    if (operation == '+') {
      return a + b;
    }
    if (operation == '-') {
      return a - b;
    }
    if (operation == '*') {
      return a * b;
    }
    if (operation == '/') {
      return (a / b).toFixed(3);
    }
  }
   

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function endGame() {
    showBlock(quize.endGameBlock);
    quize.scoreElem.textContent = quize.score;
  }

  function resetProgressBar() {
    count = 0;
  }

  function showBlock(block) {
    quize.startGameBlock.style.display = 'none';
    quize.playGameBlock.style.display = 'none';
    quize.endGameBlock.style.display = 'none';
    block.style.display = 'block';
  }

  showBlock(quize.startGameBlock);
});
