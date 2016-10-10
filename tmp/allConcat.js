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
