module.exports = function(onKeyPress) {

  // Repl stuff
  var stdin = process.stdin;
  // set stdin on raw mode and listen in UTF-8
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding( 'utf8' );

  // input loop event
  stdin.on('data', onKeyPress);

}