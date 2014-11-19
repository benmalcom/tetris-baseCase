# TETRIS! (kinda)

A node.js implementation of a tetris-like game for baseCase

## Running
with node.js installed, run:

    node game.js

the game uses unicode characters to draw shapes by default. If you want to use plain characters, add `--nounicode`, i.e.:

    node game.js --nounicode

I added unicode because I thought it looked better on the terminal. It should run just fine on OSX and Linux, not sure about windows.

## Controls:
    w -- rotate Counter-Clockwise
    s -- rotate Clockwise
    a -- move left
    d -- move right

## Test
Test coverage is appaling, but It is pretty late and i'm pretty sleepy. If you still want to run the few tests I wrote, type:

    npm install --dev
    mocha

Thanks!

Dario Villanueva