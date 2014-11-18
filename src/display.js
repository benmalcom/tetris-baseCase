// display stuff
var arguments = process.argv.slice(2);

var useUnicode = (arguments.join("").indexOf("nounicode") < 0);


var LEFT_TOP = useUnicode ? "┏" : "|";
var RIGHT_TOP = useUnicode ? "┓" : "|";
var LEFT_BOTTOM = useUnicode ? "┗" : "|";
var RIGHT_BOTTOM = useUnicode ? "┛" : "|";
var DASH = useUnicode ? "━━" : "-";
var BAR = useUnicode ? "┃" : "|";
var FULL = useUnicode ? "▣ " : "*";
var EMPTY = useUnicode ? "  " : " ";




module.exports = {

  printBoard: function (board) {

    var row, col;

    process.stdout.write("\u001B[2J\u001B[0;0f");

    process.stdout.write("\n BASECASE TETRIS! \n\n")

    // write the end row
    process.stdout.write(LEFT_TOP);
    for (row = 0; row < board.length; row++) {
      process.stdout.write(DASH);
    }
    process.stdout.write(RIGHT_TOP + "\n");

    for (row = 0; row < board.length; row++) {
      process.stdout.write(BAR);
      for (col = 0; col < board.length; col++) {
        process.stdout.write(board[row][col] ? FULL : EMPTY);
      }
      process.stdout.write(BAR + "\n");
    }
    // write the end row
    process.stdout.write(LEFT_BOTTOM);
    for (row = 0; row < board.length; row++) {
      process.stdout.write(DASH)
    }
    process.stdout.write(RIGHT_BOTTOM + "\n")

  },

  promptUser: function () {
    process.stdout.write("\n (w/s to rotate, a/d to move): ");
  },

  printInvalidMove: function () {
    process.stdout.write("\nInvalid Move!\n");
  },

  printGameOver: function () {

  }

};