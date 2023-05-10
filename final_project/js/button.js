if ("serial" in navigator) {
  document.addEventListener("DOMContentLoaded", function () {
    const arduinoConnectButton = document.getElementById('connect-button');
    arduinoConnectButton.addEventListener('click', () => {
      cargo.active = !cargo.active;
      updateArduinoLED();
      // nextColor();
      console.log("arduino is active:", cargo.active)
      updateArduinoLED();
      connect();
      // if (cargo.active) {
      //     arduinoConnectButton.innerHTML = "Connected to Arduino";
      // }
      // else {
      //     arduinoConnectButton.innerHTML = "Connect to Arduino";
      // }
    });
  });
}

let playStopButton = document.getElementById('play-stop-button');
document.addEventListener("DOMContentLoaded", function() {
  playStopButton.addEventListener('click', togglePlay);
});

document.addEventListener("DOMContentLoaded", function() {
  let startInkGameButton = document.getElementById('start-ink-game-button');
  startInkGameButton.addEventListener('click', startInkGame);
});

let clearCanvasButton = document.getElementById('clear-button');
document.addEventListener("DOMContentLoaded", function() {
  clearCanvasButton.addEventListener('click', clearCanvas);
});

// document.addEventListener("DOMContentLoaded", function() {
//   const debug = document.getElementById('debug');
//   debug.addEventListener('click', function() {
//     console.log(gridArray2);
//     console.log(countGrid());
//     console.log(countColorGrid());
//     console.log(mapCounterToChance(countGrid()));
//   });
// });

// let spawnButton;
// document.addEventListener("DOMContentLoaded", function() {
//   spawnButton = document.getElementById('spawn-button');
//   spawnButton.addEventListener('click', spawnEnemy);
// });
//
// let spawnAllyButton;
// document.addEventListener("DOMContentLoaded", function() {
//   spawnAllyButton = document.getElementById('spawn-ally-button');
//   spawnAllyButton.addEventListener('click', spawnAlly);
// });

// let increaseCountButton;
// document.addEventListener("DOMContentLoaded", function() {
//   increaseCountButton = document.getElementById('increase-count-button');
//   increaseCountButton.addEventListener('click', function() {
//     spawnCount += 1;
//     spawnCounters.forEach(counter => {
//       counter.innerHTML = spawnCount;
//     });
//
//   });
// });
//
// let decreaseCountButton;
// document.addEventListener("DOMContentLoaded", function() {
//   decreaseCountButton = document.getElementById('decrease-count-button');
//   decreaseCountButton.addEventListener('click', function() {
//     if (spawnCount > 1) {
//       spawnCount -= 1;
//
//       spawnCounters.forEach(counter => {
//         counter.innerHTML = spawnCount;
//       });
//     }
//   });
// });



