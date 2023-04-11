#include <Arduino_JSON.h>

// int trigPin = 6;
// int echoPin = 7;
// long duration, cm, inches;
bool active = false;
int red = 0;
int green = 0;
int blue = 0;

int buttonPushCounter = 0;  // counter for the number of button presses
int buttonState = 0;        // current state of the button
int lastButtonState = 0;    // previous state of the button

const int NEXT_COLOR_PIN = 12;
const int PIN_RED   = 5;
const int PIN_GREEN = 6;
const int PIN_BLUE  = 7;

JSONVar serialOutput;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  // pinMode(trigPin, OUTPUT);
  // pinMode(echoPin, INPUT);
  pinMode(NEXT_COLOR_PIN, INPUT_PULLUP);
  pinMode(PIN_RED,   OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
  pinMode(PIN_BLUE,  OUTPUT);
}

void loop() {


  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      }
      else {
        active = (bool) serialInput["active"];
        red = (int) serialInput["red"];
        green = (int) serialInput["green"];
        blue = (int) serialInput["blue"];
      }
    }
  }

  if (active) {
    setColor(red, green, blue);
    // put your main code here, to run repeatedly:
    // digitalWrite(trigPin, LOW);
    // delayMicroseconds(2);
    // digitalWrite(trigPin, HIGH);
    // delayMicroseconds(10);
    // digitalWrite(trigPin, LOW);

    // duration = pulseIn(echoPin, HIGH);

    // cm = (duration/2) / 29.1;
    // inches = (duration/2) / 74;
    //
    // serialOutput["cm"] = cm;
    // serialOutput["inches"] = inches;

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
      delay(50);
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

    Serial.println(serialOutput);
    // give time to process
    // delay(500);
  }
}

void setColor(int R, int G, int B) {
  analogWrite(PIN_RED,   R);
  analogWrite(PIN_GREEN, G);
  analogWrite(PIN_BLUE,  B);
}
