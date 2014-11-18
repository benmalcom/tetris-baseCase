

var Tetris = function(options) {

  var options = options || {};

  // initialise properties
  var board = []
  var boardWidth = options.width || 20;
  // initial position for new pieces
  var initialPos = {col: boardWidth/2, row: 0};

  var currentTetromino;

  var tetrominos = require('./figures.js');

  // create a new board;
  function initialiseBoard() {
    var row, col;
    for (row = 0; row < boardWidth; row++) {
      board[row] = [];
      for (col = 0; col < boardWidth; col++) {
        board[row][col] = 0;
      }
    }
  }

  // get a random tetromino
  function randomTetromino() {
    var fig = tetrominos[(Math.random() * tetrominos.length) | 0].slice();

    return {
      fig: fig,
      pos: initialPos
    };
  }

  // Rotate a figure Clockwise
  function rotateFigureCW(figure) {

    var rotated = [];

    var row, col,
        h = figure[0].length,
        w = figure.length;

    for (row = 0; row < h; row++) {
      rotated[row] = [];
      for (col = 0; col < w; col++) {
        rotated[row][col] = figure[w - col - 1][row];
      }
    }

    return rotated
  }

  // rotate a figure counter-clockwise
  function rotateFigureCCW(figure) {
    var rotated = [];

    var row,col,
        h = figure[0].length,
        w = figure.length;

    for (row = 0; row < h; row++) {
      rotated[row] = [];
      for (col = 0; col < w; col++) {
        rotated[row][col] = figure[col][h - row - 1];
      }
    }

    return rotated
  }

  // check if a move is valid for a given board, figure and position
  function isValid(move) {

    var row, col,
      w = move.fig[0].length;
      h = move.fig.length;

    if (move.pos.row + h > boardWidth)
      return false;

    if (move.pos.row < 0 )
      return false;

    if (move.pos.col + w > boardWidth)
      return false

    if (move.pos.col < 0)
      return false

    for (row = 0; row < h; row++) {
      for (col = 0; col < w; col++) {
        if (!move.fig[row][col])
          continue // don't check empty spaces
        if (board[row + move.pos.row][col + move.pos.col]) {
          // if the new space has a 1 in it, we can't move
          return false
        }

      }
    }

    // it's a valid move
    return true;
  }


  // public methods
  return {

    start: function() {
      initialiseBoard();
      currentTetromino = randomTetromino();
    },

    getState: function() {
      return {
        board: board,
        currentTetromino: currentTetromino
      };
    },

    canMove : function (tetromino) {
      var move;
      // can move left
      move = this.moveLeft(tetromino);
      if (isValid(move)) {
        return true;
      }

      move = this.moveRight(tetromino);
      if (isValid(move)) {
        return true;
      }

      move = this.rotateRight(tetromino);
      if (isValid(move)) {
        return true;
      }

      move = this.rotateLeft(tetromino);
      if (isValid(move)) {
        return true;
      }
      return false;
    },

    gameOver : function () {
      return !this.canMove(currentTetromino);
    },

    // Movement
    moveLeft : function (tetromino) {
      return {
        pos : {
          col : tetromino.pos.col - 1,
          row : tetromino.pos.row + 1
        },
        fig : tetromino.fig
      };

    },

    moveRight : function (tetromino) {
      return {
        pos : {
          col : tetromino.pos.col + 1,
          row : tetromino.pos.row + 1
        },
        fig: tetromino.fig
      };
    },

    // rotation
    rotateRight : function (tetromino) {
      return {
        pos: {
          col : tetromino.pos.col,
          row : tetromino.pos.row + 1
        },
        fig: rotateFigureCW(tetromino.fig)
      };
    },

    // rotation
    rotateLeft : function (tetromino) {
      return {
        pos: {
          col : tetromino.pos.col,
          row : tetromino.pos.row + 1
        },
        fig: rotateFigureCCW(tetromino.fig)
      };
    },

    // joins the current board with the position of the
    // tetromino and returns the updated board.
    updateBoard: function() {
      // this is an ugly but surprisingly effective way of
      // copying a board.
      var newBoard = JSON.parse(JSON.stringify(board)); // get a copy of the board

      var row, col,
        w = currentTetromino.fig[0].length,
        h = currentTetromino.fig.length;

      for (row = 0; row < h; row++) {
        for (col = 0; col < w; col++) {
          if (currentTetromino.fig[row][col] > 0)
            newBoard[row + currentTetromino.pos.row][col + currentTetromino.pos.col] = 1

        }
      }

      return newBoard
    },

    // lands the piece, i.e. updates the current board
    // with the piece
    landPiece: function() {
      board = this.updateBoard();
    },

    spawnNewPiece: function() {
      currentTetromino = randomTetromino();
    },

    step: function(key) {
      var move;

      if (key === 'a')
        move = this.moveLeft(currentTetromino)
      if ( key === 'd')
        move = this.moveRight(currentTetromino)
      if ( key === 'w')
        move = this.rotateLeft(currentTetromino)
      if ( key === 's')
        move = this.rotateRight(currentTetromino)

      // if the movement is valid
      // update the current tetromino
      // with the moved one
      if (isValid(move)) {
        currentTetromino = move;
      }
      // otherwise return an error
      else {
        return "invalidMove";
      }

      // if the current tetromino cannot move anymore
      if (!this.canMove(currentTetromino)) {
        // land it
        this.landPiece();
        // spawn a new tetromino
        this.spawnNewPiece();
        // and return the current state
        return this.updateBoard();
      }
      // if the tetromino can still move, then we
      // simply return the current state
      else {
        return this.updateBoard();
      }

    }

  }


};

module.exports = Tetris;

