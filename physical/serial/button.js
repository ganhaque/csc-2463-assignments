document.addEventListener("DOMContentLoaded", function() {
  const arduinoConnectButton = document.getElementById('connect-button');
  arduinoConnectButton.addEventListener('click', () => {
    activationState.active = !activationState.active;
    serialWrite(activationState);
    // nextColor();
    console.log("arduino is active:", activationState.active)
    if (activationState.active) {
      arduinoConnectButton.innerHTML = "Connected to Arduino";
    }
    else {
      arduinoConnectButton.innerHTML = "Connect to Arduino";
    }
  });
});

