function Game() {
  this.colors = ["red", "blue", "yellow", "green"];
  this.sequence = [];
  this.userSequence = [];
  this.counter = 0;
}

Game.prototype.randomColor = function() {
  var x = Math.floor(Math.random() * this.colors.length);
  this.sequence.push(this.colors[x]);
  return this.colors[x];
}

Game.prototype.compareColors = function() {
  for (i = 0; i < this.sequence.length; i++) {
    if (this.sequence[i] !== this.userSequence[i]) {
      return false;
    }
  }
  return true;
}

exports.gameModule = Game;
