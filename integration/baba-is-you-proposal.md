# Integration Project
BABA AND CODE IS PAINT
## Overview

For the integration project, I want to make an ~~gimmicky~~ improved Paint App (grid).

> Mouse or drawing tablet can give you carpal tunnel (RSI)

Use keyboard instead.

In addition to using the mouse to draw,
you can draw by moving BABA (a character sprite) around the canvas or by writing code.

<!-- Note: \<leader> mean space -->

### MOUSE CONTROL
The player will select a color from the color palette (and maybe add their own color feature?).
They will be able to color any grid their mouse touched with the color they selected (basic pixel art program).

### KEYBOARD CONTROL
The player will use TAB to cycle through the color. Use \<leader> (space) + a to add new BABA with the selected color.
Use wasd to move the initial BABA location around. After that, you can control all the added BABAs with wasd
(or maybe add a toggle so that only BABAs with the same selected color can move).

### CODE CONTROL (likely)
There will be a region where the player can write their code and run by pressing a button.
Maybe add vim editing or let user upload a text file.

Example code:
```js
// format (x, y)
spawn 0 0 // spawn a baba at the top left of the canvas with the selected color
spawn 0 max red // spawn a baba at the bottom left of the canvas with the color red
mov 0 0 to 1 1 // if BABA is at 0,0 ->
               //move from 0,0 to 0,3, coloring 0,1 0,2 and 0,3 with the BABA's color
del 1 1 // remove BABA at 1, 1
// if mov is diagonal, and dx == dy, only color the diagonal squares
// else, move dy then move dx (two straight lines)
// maybe add variable by using hashmap?
```

### CHALLENGE MODE (maybe)
The player can enable challenge mode. They will be given a picture (of the same grid size),
and they will have to replicate it exactly with the least amount of code or movement key.

## Graphics:
P5 will render the color palette on the left side. The drawing area will be rendered by parsing a 2D grid array.
The code area will be at the bottom or right of the canvas.


## Sounds:
Use BABA IS YOU OST or maybe some randomly generated music in the background?

## Hardware/Arduino:
The arduino have the RBG LED to display the current selected color,
buttons to switch to next color, eraser mode toggle, run code, and wasd equivalent(likely, but redundant).

