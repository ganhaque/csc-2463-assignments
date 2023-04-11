int ledPin = 13;
int dotPin = 12;
int dashPin = 11;

int input1 = 2;
int input2 = 3;

//For letters
char* letters[] = {
  ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..",    // A-I
  ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.",  // J-R
  "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."          // S-Z
};

//For Numbers
char* numbers[] = {
  "-----", ".----", "..---", "...--", "....-", ".....",
  "-....", "--...", "---..", "----."
};

String string1 = "As I see it, yes";
String string2 = "It is certain";
String string3 = "It is decidedly so";
String string4 = "Most likely";
String string5 = "Outlook good";
String string6 = "Signs point to yes";
String string7 = "Without a doubt";
String string8 = "Yes";
String string9 = "Yes - definitely";
String string10 = "You may rely on it";
String string11 = "Reply hazy, try again";
String string12 = "Ask again later";
String string13 = "Better not tell you now";
String string14 = "Cannot predict now";
String string15 = "Concentrate and ask again";
String string16 = "Don't count on it";
String string17 = "My reply is no";
String string18 = "My sources say no";
String string19 = "Outlook not so good";
String string20 = "Very doubtful";

String answers[] = {
  string1,
  string2,
  string3,
  string4,
  string5,
  string6,
  string7,
  string8,
  string9,
  string10,
  string11,
  string12,
  string13,
  string14,
  string15,
  string16,
  string17,
  string18,
  string19,
  string20,
};

void flashSequence(char* sequence) {
  int i = 0;
  while (sequence[i] != NULL) {
    flashDotOrDash(sequence[i]);
    i++;
  }
  delay(200 * 3);
}

void flashDotOrDash(char dotOrDash) {
  digitalWrite(ledPin, HIGH);
  if (dotOrDash == '.') {
    digitalWrite(dotPin, HIGH);
    delay(200);
    digitalWrite(dotPin, LOW);
  } else  // must be a -
  {
    digitalWrite(dashPin, HIGH);
    delay(200 * 3);
    digitalWrite(dashPin, LOW);
  }
  digitalWrite(ledPin, LOW);
  delay(200);
}

void setup() {
  // put your setup code here, to run once:
  //start serial connection
  Serial.begin(9600);
  //configure pin 2 as an input and enable the internal pull-up resistor
  pinMode(input1, INPUT_PULLUP);
  pinMode(input2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  pinMode(dotPin, OUTPUT);
  pinMode(dashPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  char ch;
  //read the pushbutton value into a variable
  int sensorVal = digitalRead(input1);
  int toggleVal = digitalRead(input2);

  bool playing = false;

  // Serial.println(toggleVal);
  if (toggleVal == LOW) {
    ledPin += 1;
    dotPin += 1;
    dashPin += 1;
    if (ledPin > 13) {
      ledPin = 11;
    }
    if (dotPin > 13) {
      dotPin = 11;
    }
    if (dashPin > 13) {
      dashPin = 11;
    }
    digitalWrite(ledPin, HIGH);
    delay(200 * 3);
    digitalWrite(ledPin, LOW);
  }
  //print out the value of the pushbutton
  // Serial.write(sensorVal);


  if (sensorVal == LOW && playing == false) {  // when button is pressed
    int random_index = random(0, 20);
    String str = answers[random_index];
    Serial.print("Message = ");
    Serial.println(str);
    // String str = "aaa";

    // Length (with one extra character for the null terminator)
    int str_len = str.length() + 1;

    playing = true;
    for (int i = 0; i <= str_len; i++) {
      ch = str[i];  // read a single letter if (ch >= 'a' && ch <= 'z')
      if (ch >= 'a' && ch <= 'z') {
        flashSequence(letters[ch - 'a']);
        // Serial.print("ye");
      } else if (ch >= 'A' && ch <= 'Z') {
        flashSequence(letters[ch - 'A']);
      } else if (ch >= '0' && ch <= '9') {
        flashSequence(numbers[ch - '0']);
      } else if (ch == ' ') {
        delay(200 * 4);
      }
      // digitalWrite(13, HIGH);
    }
    playing = false;
  } else {
    digitalWrite(13, LOW);
  }
}
