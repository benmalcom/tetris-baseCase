# TETRIS! (kinda)

A node.js implementation of a tetris-like game for baseCase

## Running
with node.js installed, run:

    node game.js

the game uses unicode characters to draw shapes by default. If you want to use plain characters, add `--nonicode`, i.e.:

    node game.js --nounicode

I added unicode because I thought it look good

## Controls:
    w -- rotate Counter-Clockwise
    s -- rotate Clockwise
    a -- move left
    d -- move right

## Test
Test coverage is appaling, but It's almost 12AM and i'm pretty sleepy, so if you want to run the 4 tests I wrote, type:

    npm install --dev
    mocha

Thanks!

Dario