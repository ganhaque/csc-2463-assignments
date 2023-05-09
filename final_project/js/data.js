let timerDiv = document.getElementById('timer');
// timerDiv.innerHTML = '';

// const spawnCounters = document.getElementById('spawn-counter');
const spawnCounters = document.querySelectorAll('#spawn-counter');
spawnCounters.forEach(counter => {
  counter.innerHTML = spawnCount;
});


let leaderboardDiv = document.getElementById('leaderboard');

// let enemyCountDiv = document.getElementById('enemy-count-div');
// enemyCountDiv.innerHTML = "# of enemy: " + gameData.enemyAmount;
// let allyCountDiv = document.getElementById('ally-count-div');
// allyCountDiv.innerHTML = "# of ally: " + gameData.allyAmount;

//////////////////////////////////////////////////////
// let enemyContainer = document.getElementById('enemy-count-div');
//
// let enemyIncrementButton = document.createElement('button');
// enemyIncrementButton.innerHTML = '+';
// enemyIncrementButton.onclick = function() {
//   gameData.enemyAmount = Math.max(gameData.enemyAmount + 1, 0);
//   enemyCountDiv.innerHTML = "&nbsp; enemy: " + gameData.enemyAmount;
// };
//
// let enemyDecrementButton = document.createElement('button');
// enemyDecrementButton.innerHTML = '-';
// enemyDecrementButton.onclick = function() {
//   gameData.enemyAmount = Math.max(gameData.enemyAmount - 1, 0);
//   enemyCountDiv.innerHTML = "&nbsp; enemy: " + gameData.enemyAmount;
// };
//
// let enemyCountDiv = document.createElement('div');
// enemyCountDiv.innerHTML = "&nbsp; enemy: " + gameData.enemyAmount;
//
// enemyContainer.insertBefore(enemyIncrementButton, enemyContainer.firstChild);
// enemyContainer.insertBefore(enemyDecrementButton, enemyContainer.firstChild);
// enemyContainer.appendChild(enemyCountDiv);

let enemyContainer = document.getElementById('enemy-count-div');
enemyContainer.innerHTML = '';

let enemyCounterText = document.createElement('p');
enemyCounterText.className = 'counter-text';
enemyCounterText.innerHTML = "enemy: " + gameData.enemyAmount;
enemyContainer.appendChild(enemyCounterText);

let enemyDecrementButton = document.createElement('button');
enemyDecrementButton.innerHTML = '-';
enemyDecrementButton.onclick = function() {
  gameData.enemyAmount = Math.max(gameData.enemyAmount - 1, 0);
  enemyCounterText.innerHTML = "enemy: " + gameData.enemyAmount;
};

enemyContainer.appendChild(enemyDecrementButton);
let enemyIncrementButton = document.createElement('button');
enemyIncrementButton.innerHTML = '+';
enemyIncrementButton.onclick = function() {
  gameData.enemyAmount = Math.max(gameData.enemyAmount + 1, 0);
  enemyCounterText.innerHTML = "enemy: " + gameData.enemyAmount;
};
enemyContainer.appendChild(enemyIncrementButton);

//////////////////////////////////////////////////////
let allyContainer = document.getElementById('ally-count-div');
allyContainer.innerHTML = '';

let allyCounterText = document.createElement('p');
allyCounterText.className = 'counter-text';
allyCounterText.innerHTML = "ally: " + gameData.allyAmount;
allyContainer.appendChild(allyCounterText);

let allyDecrementButton = document.createElement('button');
allyDecrementButton.innerHTML = '-';
allyDecrementButton.onclick = function() {
  gameData.allyAmount = Math.max(gameData.allyAmount - 1, 0);
  allyCounterText.innerHTML = "ally: " + gameData.allyAmount;
};
allyContainer.appendChild(allyDecrementButton);

let allyIncrementButton = document.createElement('button');
allyIncrementButton.innerHTML = '+';
allyIncrementButton.onclick = function() {
  gameData.allyAmount = Math.max(gameData.allyAmount + 1, 0);
  allyCounterText.innerHTML = "ally: " + gameData.allyAmount;
};
allyContainer.appendChild(allyIncrementButton);

//////////////////////////////////////////////////////
let timeContainer = document.getElementById('time-per-level-div');
timeContainer.innerHTML = '';

let timeCounterText = document.createElement('p');
timeCounterText.className = 'counter-text';
timeCounterText.innerHTML = "time: " + gameData.timePerLevel;
timeContainer.appendChild(timeCounterText);

let timeDecrementButton = document.createElement('button');
timeDecrementButton.innerHTML = '-';
timeDecrementButton.onclick = function() {
  if (gameData.mode != 'ink-game') {
    gameData.timePerLevel = Math.max(gameData.timePerLevel - 1, 0);
    timeCounterText.innerHTML = "time: " + gameData.timePerLevel;
  }
};
timeContainer.appendChild(timeDecrementButton);

let timeIncrementButton = document.createElement('button');
timeIncrementButton.innerHTML = '+';
timeIncrementButton.onclick = function() {
  if (gameData.mode != 'ink-game') {
    gameData.timePerLevel = Math.max(gameData.timePerLevel + 1, 0);
    timeCounterText.innerHTML = "time: " + gameData.timePerLevel;
  }
};
timeContainer.appendChild(timeIncrementButton);



// let timeContainer = document.getElementById('time-per-level-div');
//
// let timeIncrementButton = document.createElement('button');
// timeIncrementButton.innerHTML = '+';
// timeIncrementButton.onclick = function() {
//   if (gameData.mode != 'ink-game') {
//     gameData.timePerLevel = Math.max(gameData.timePerLevel + 1, 0);
//     timeCountDiv.innerHTML = "&nbsp; time: " + gameData.timePerLevel;
//   }
// };
//
// let timeDecrementButton = document.createElement('button');
// timeDecrementButton.innerHTML = '-';
// timeDecrementButton.onclick = function() {
//   if (gameData.mode != 'ink-game') {
//     gameData.timePerLevel = Math.max(gameData.timePerLevel - 1, 0);
//     timeCountDiv.innerHTML = "&nbsp; time: " + gameData.timePerLevel;
//   }
// };
//
// let timeCountDiv = document.createElement('div');
// timeCountDiv.innerHTML = "&nbsp; time: " + gameData.timePerLevel;
//
// timeContainer.insertBefore(timeIncrementButton, timeContainer.firstChild);
// timeContainer.insertBefore(timeDecrementButton, timeContainer.firstChild);
// timeContainer.appendChild(timeCountDiv);


let crowdButton = document.getElementById('crowd-diff');
crowdButton.onclick = function() {
  // gameData.enemyAmount = Math.round(gameData.enemyAmount * 1.75);
  // gameData.allyAmount = Math.round(gameData.allyAmount * 1.75);
  gameData.enemyAmount = 72;
  gameData.allyAmount = 10;
  // gameData.timePerLevel = 6;
  updateGameSetting();
}

let easyButton = document.getElementById('easy-diff');
easyButton.onclick = function() {
  gameData.enemyAmount = 9;
  gameData.allyAmount = 2;
  updateGameSetting();
}

let normalButton = document.getElementById('normal-diff');
normalButton.onclick = function() {
  gameData.enemyAmount = 27;
  gameData.allyAmount = 2;
  updateGameSetting();
}

let hardButton = document.getElementById('hard-diff');
hardButton.onclick = function() {
  gameData.enemyAmount = 42;
  gameData.allyAmount = 2;
  updateGameSetting();
}

let impossibleButton = document.getElementById('impossible-diff');
impossibleButton.onclick = function() {
  gameData.enemyAmount = 72;
  gameData.allyAmount = 2;
  updateGameSetting();
}

function updateGameSetting() {
  // Update enemy and ally count divs
  enemyCounterText.innerHTML = "enemy: " + gameData.enemyAmount;
  allyCounterText.innerHTML = "ally: " + gameData.allyAmount;

  // Update time count div
  timeCounterText.innerHTML = "time: " + gameData.timePerLevel;
}
