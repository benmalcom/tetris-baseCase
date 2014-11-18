
var display = require('./src/display');
var input = require('./src/repl');
var Tetris = require('./src/tetris');

var tetris = Tetris();


input(function onKeyPress( key ) {

  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    console.log("Exiting on user request");
    process.exit();
  }

  if (tetris.gameOver()) {
    console.log("No more moves!");
    process.exit();
  }

  process.stdout.write(key + " \n")
  if ('adws'.indexOf(key) >= 0) {
    var nextBoard = tetris.step(key);
    if (nextBoard === "invalidMove") {
      display.printInvalidMove();
    } else {
      display.printBoard(nextBoard);
    }
  } else {
    display.printInvalidMove();
  }
  display.promptUser();

});


tetris.start();
display.printBoard(tetris.updateBoard());
display.promptUser();





