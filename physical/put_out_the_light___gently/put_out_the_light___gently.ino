/*
  Analog input, analog output, serial output

  Reads an analog input pin, maps the result to a range from 0 to 255 and uses
  the result to set the pulse width modulation (PWM) of an output pin.
  Also prints the results to the Serial Monitor.

  The circuit:
  - potentiometer connected to analog pin 0.
    Center pin of the potentiometer goes to the analog pin.
    side pins of the potentiometer go to +5V and ground
  - LED connected from digital pin 9 to ground through 220 ohm resistor

  created 29 Dec. 2008
  modified 9 Apr 2012
  by Tom Igoe
  modified 2 Apr 2023
  by Christian Che

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/AnalogInOutSerial
*/

// These constants won't change. They're used to give names to the pins used:
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 9;  // Analog output pin that the LED is attached to
const int resetButton = 8;
const int dangerLED = 2;
const int warningLED = 3;

int sensorValue = 0;  // value read from the pot
int outputValue = 0;  // value output to the PWM (analog out)

int counter = 0;

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  pinMode(resetButton, INPUT_PULLUP);
  pinMode(warningLED, OUTPUT);
  pinMode(dangerLED, OUTPUT);
}

void loop() {
  int resetSignal = digitalRead(resetButton);
  if (resetSignal == LOW) {
    reset();
  }

  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);

  if (outputValue <= 30 && counter <= 100) {
    counter += 1;
  }

  Serial.print("Counter: ");
  Serial.println(counter);

  // if (counter > 80 && counter < 90) {
  //   digitalWrite(warningLED, HIGH);
  // } else if (counter > 90 && counter < 100) {
  //   digitalWrite(dangerLED, HIGH);
  // }

  // if (counter > 100) {
  //   // Serial.println("above");
  //   analogWrite(analogOutPin, LOW);
  //   digitalWrite(warningLED, LOW);
  //   digitalWrite(dangerLED, LOW);
  // } else {
  //   analogWrite(analogOutPin, 200 - counter * 2);
  // }

  if (counter > 100) {
    // Counter is equal to or greater than 100
    digitalWrite(warningLED, LOW);
    digitalWrite(dangerLED, LOW);
  } else if (counter >= 90) {
    // Counter is between 90 and 100 (inclusive)
    digitalWrite(dangerLED, HIGH);
  } else if (counter >= 85) {
    // Counter is between 85 and 90 (inclusive)
    digitalWrite(warningLED, HIGH);
  } else {
    // Counter is less than 80
  }


  if (counter > 100) {
    // Counter is equal to or greater than 100
    analogWrite(analogOutPin, LOW);
  } else {
    analogWrite(analogOutPin, 202 - counter * 2);
    // analogWrite(analogOutPin, counter * 2);
  }


  // change the analog out value:

  // print the results to the Serial Monitor:
  // Serial.print("sensor = ");
  // Serial.print(sensorValue);
  // Serial.print("\t output = ");
  // Serial.println(outputValue);

  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delay(2);
}

void reset() {
  analogWrite(analogOutPin, LOW);
  digitalWrite(warningLED, LOW);
  digitalWrite(dangerLED, LOW);
  // Serial.println("Reset");
  Serial.print("Score: ");
  if (counter > 100) {
    Serial.println(-1);
  } else {
    Serial.println(counter);
  }
  counter = 0;
  delay(3000);
}
