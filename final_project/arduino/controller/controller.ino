#include <Arduino_JSON.h>

#define VRX_PIN  A0 // Arduino pin connected to VRX pin
#define VRY_PIN  A1 // Arduino pin connected to VRY pin

#define LEFT_THRESHOLD  400
#define RIGHT_THRESHOLD 800
#define UP_THRESHOLD    400
#define DOWN_THRESHOLD  800

int xValue = 0 ; // To store value of the X axis
int yValue = 0 ; // To store value of the Y axis
String command = "";
String prevCommand = "";

unsigned long previousMillis = 0;  // variable to store the previous time
const long interval = 100;        // interval between prints (in milliseconds)

// int trigPin = 6;
// int echoPin = 7;
// long duration, cm, inches;
bool active = true;
int red = 0;
int green = 0;
int blue = 0;

int buttonPushCounter = 0;  // counter for the number of button presses
int buttonState = 0;        // current state of the button
int lastButtonState = 0;    // previous state of the button

const int NEXT_COLOR_PIN = 12;

const int LEFT_PIN = 11;
const int RIGHT_PIN = 10;
const int DOWN_PIN = 9;
const int UP_PIN = 8;

const int PIN_RED = 5;
const int PIN_GREEN = 6;
const int PIN_BLUE = 3;

JSONVar serialOutput;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  // pinMode(trigPin, OUTPUT);
  // pinMode(echoPin, INPUT);
  pinMode(NEXT_COLOR_PIN, INPUT_PULLUP);
  pinMode(PIN_RED, OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
  pinMode(PIN_BLUE, OUTPUT);
  delay(2000);
}

void loop() {
  // Serial.println(red);
  // Serial.println("pog");
  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        // Serial.println("JSON parsing succesful!");
        // Serial.print("New red is ");
        active = (bool)serialInput["active"];
        red = (int)serialInput["red"];
        green = (int)serialInput["green"];
        blue = (int)serialInput["blue"];
        // Serial.println(red);
      }
    }
  }

  if (active) {
    // read analog X and Y analog values
    xValue = analogRead(VRX_PIN);
    yValue = analogRead(VRY_PIN);

    // print data to Serial Monitor on Arduino IDE
    // Serial.print("x = ");
    // Serial.print(xValue);
    // Serial.print(", y = ");
    // Serial.println(yValue);

    // converts the analog value to commands
    // reset commands
    prevCommand = command;
    // command = "";

    // check left/right commands
    if (xValue < LEFT_THRESHOLD)
      // command = "LEFT";
      command = "RIGHT";
    else if (xValue > RIGHT_THRESHOLD)
      // command = "RIGHT";
      command = "LEFT";
    // check up/down commands (delete else if want two command at once)
    else if (yValue < UP_THRESHOLD)
      command = "UP";
    else if (yValue > DOWN_THRESHOLD)
      command = "DOWN";
    else {
      command = "";
    }
    
    // if (prevCommand != command) {
    //   serialOutput["movement"] = command;
    //   // Serial.println(command);
    //   Serial.println(serialOutput);
    // }

    unsigned long currentMillis = millis();  // get the current time
    // check if it's time to print "Hello"
    if (currentMillis - previousMillis >= interval) {
      serialOutput["movement"] = command;
      // Serial.println(command);
      Serial.println(serialOutput);

      // save the current time for the next loop
      previousMillis = currentMillis;
    }


    // Serial.println(command);

    setColor(red, green, blue);
    serialOutput["next"] = false;

    // button edge detection:
    // read the pushbutton input pin:
    buttonState = digitalRead(NEXT_COLOR_PIN);

    // compare the buttonState to its previous state
    if (buttonState != lastButtonState) {
      // if the state has changed, increment the counter
      if (buttonState == HIGH) {
        // if the current state is HIGH then the button went from off to on:
        serialOutput["next"] = true;
        Serial.println(serialOutput);
        // buttonPushCounter++;
        // Serial.println("on");
        // Serial.print("number of button pushes: ");
        // Serial.println(buttonPushCounter);
      } else {
        // buttonPushCounter++;
        // if the current state is LOW then the button went from on to off:
        // Serial.println("off");
      }
      // Delay a little bit to avoid bouncing
      delay(20);
    }
    // save the current state as the last state, for next time through the loop
    lastButtonState = buttonState;


    // turns on the LED every button pushes by checking the modulo of the
    // button push counter. the modulo function gives you the remainder of the
    // division of two numbers:
    // if (buttonPushCounter % 2 == 0) {
    //   digitalWrite(ledPin, HIGH);
    // } else {
    //   digitalWrite(ledPin, LOW);
    // }

    // give time to process
    // delay(500);
    // Serial.println(serialOutput);
  }
}

void setColor(int R, int G, int B) {
  analogWrite(PIN_RED, R);
  analogWrite(PIN_GREEN, G);
  analogWrite(PIN_BLUE, B);
}
