window.onload = (function () {
  'use strict';
  var count = 0;
  var interval = null;

  function Quize() {
    this.aValue = null;
    this.bValue = null;
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

  function startGame() {
    showBlock(quize.playGameBlock);

    quize.score = 0;

    getTask();

    if (interval !== null) clearInterval(interval);
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
    }, 50);
  }

  function getTask() {
    resetProgressBar();
    var a = getRandomInt(1, 20);
    quize.aValue = a;
    var b = getRandomInt(1, 20);
    quize.bValue = b;
    quize.result = a + b;
    quize.mistakenResult = getRandomInt(1, 20);

    var aValue = document.querySelector(".a-value");
    aValue.textContent = a;

    var bValue = document.querySelector('.b-value');
    bValue.textContent = b;

    var answer = document.querySelector('.answer');
    answer.textContent = randomAnswer(quize.result, quize.mistakenResult);
  }

  quize.startButton.addEventListener("click", function () {
    startGame();
  });

  quize.yesButton.addEventListener('click', function () {
    getTask();
    checkCorrectAnswer(quize.aValue, quize.bValue, randomAnswer(quize.result, quize.mistakenResult));
  });

  function checkCorrectAnswer(a, b, answer) {
    if (a + b == answer) {
      console.log(a + ' + ' + b + ' = ' + answer + ' - success');
    } else {
      console.log(a + ' + ' + b + ' = ' + answer + ' - error');
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

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }


  function endGame() {
    showBlock(quize.endGameBlock);
    quize.score = 0;
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
