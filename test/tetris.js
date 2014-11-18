require('should');


describe("Tetris", function() {

  var Tetris = require('../src/tetris');

  describe("initialisation", function () {

    it('should initialise just fine', function() {
      var tetris = Tetris();
      tetris.should.be.a.function;
    });

    it('should start ok and request state', function() {
      var tetris = Tetris();
      tetris.start.should.not.throw;

      tetris.start();

      var state = tetris.getState();
      state.board.should.be.an.array;
      state.board.should.have.length(20);
      state.currentTetromino.should.be.an.object;

    });

  });

  describe("canMove", function() {

    beforeEach(function() {
      this.tetris = Tetris();
      this.tetris.start();
      this.tetrominos = require('../src/figures');
    });

    it('should be able to move when in the middle', function() {
      for (var i = 0; i < this.tetrominos.length; i++) {
        var f = this.tetrominos[i]
        var tetr = {
          fig: f,
          pos: {
            row: 0,
            col: 10
          }
        }
        this.tetris.canMove(tetr).should.be.true;
      }
    });

    it('should not be able to move when at the bottom', function() {
      for (var i = 0; i < this.tetrominos.length; i++) {
        var f = this.tetrominos[i]
        var tetr = {
          fig: f,
          pos: {
            row: 20 - f.length + 1,
            col: 10
          }
        }
        this.tetris.canMove(tetr).should.be.false;
      }
    });

  });




})