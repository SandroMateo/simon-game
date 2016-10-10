(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Game = require('./../js/simon.js').gameModule;

$(function() {
  function colorLoop(game) {
    setTimeout(function() {
      if(game.counter < game.sequence.length) {
        $('button').prop("disabled", true);
        $('#red').removeClass("btn-danger");
        $('#blue').removeClass("btn-primary");
        $('#yellow').removeClass("btn-warning");
        $('#green').removeClass("btn-success");
        if(game.sequence[game.counter] == "red") {
          $('#red').addClass("btn-danger");
        } else if(game.sequence[game.counter] == "blue") {
          $('#blue').addClass("btn-primary");
        } else if(game.sequence[game.counter] == "yellow") {
          $('#yellow').addClass("btn-warning");
        } else {
          $('#green').addClass("btn-success");
        }
        game.counter++;
        colorLoop(game);
      } else {
        $('button').prop("disabled", false);
        $('#red').addClass("btn-danger");
        $('#blue').addClass("btn-primary");
        $('#yellow').addClass("btn-warning");
        $('#green').addClass("btn-success");
        game.counter = 0;
      }
    }, 1000);
  }

  var newGame = new Game();
  $("#start").submit(function(event) {
    event.preventDefault();
    $("#start").hide();
    newGame.userSequence = [];
    var color = newGame.randomColor();
    colorLoop(newGame);
  });

  $(".btn").click(function() {
    var chosenColor = $(this).val();
    newGame.userSequence.push(chosenColor);
    if(newGame.userSequence.length == newGame.sequence.length) {
      if(newGame.compareColors()) {
        $("#start").show();
      } else {
        $("#sequence").append("<p>YOU LOSE</p>");
      }
    }
  });
});

},{"./../js/simon.js":1}]},{},[2]);
