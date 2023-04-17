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
