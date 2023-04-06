# Integration Project
Keep Talking and Nobody Explodes but Arduino
## Overview

For the integration project, I want to recreate some modules from the game Keep Talking and Nobody Explodes (KTANE).
In case you don't know about KTANE, the game goal is to solve the modules to defuse the bomb.
There are two players, the person with the bomb modules and the other person with the manual on how to solve them.

The original game have them seperate, meaning the player with the bomb have to describe the module to the other person
to learn how to solve it.

My game will be a single player game. The player has the bomb, the manual, and the display (computer screen) with info
about the bomb. Instead of communication being the main challenge in KTANE, my game's challenge will be about figuring
which module is the bomb on (solve a module at a time) because the arduino board will remain the same
(some buttons and several LEDs)

## Graphics:
The webpage will display information about the bomb such as battery amount, serial #, current module, port.

## Sounds:
There will be explosion sound if the player failed to finish the modules in time or reaches 3 mistakes.
There will also be sound indicator for modules or when mistakes are made.
Maybe some randomly generated music in the background?

## Hardware/Arduino:
The arduino will have 3 red LEDs to indicate the amount of mistakes the player has made.
It will also have at least 4 buttons for the player to interact with
and at least 4 more LEDs to communicate to the player
Maybe use the joystick


Here's my ***rough*** plan about the project:

final proj
  - keep talking and nobody explode modules
    - general challenges:
      - different game each time (generation?)
    - extra:
      - needy module
      - make it work without arduino (should be easy :cluecless:)
    - p5 display:
      - battery amount, serial #, current module, port

    - modules:
      - c = challenge
      - wire (c: have to detect the current???)
      - button (maybe, c: get number from timer)
        - a button, 4 different LEDs
      - simons says
        - 4 button, 4 different LEDs
      - memory (c: annoying to code)
        - use 4 buttons or remote
      - morse code
        - 2 buttons, 1 LED
      - maze (c: repurpose baba prototype (wall is not push))
        - 4 buttons
      - password (maybe, boring)
        - 4 buttons (2 to cycle, 2 to move between)
        - maybe use remote so that it's less awkward?

    - custom modules:
      maze v2
        - navigate with joystick, directional movement
      admin card swipe
        - mogus
      calcu-la-tor
        - use the remote to give two correct numbers for an operation and a result
        - ban the use of 0 and 1 (unless result is prime) since they made it too easy?


