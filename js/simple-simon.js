/**
 * Created by nedwaldie on 12/8/16.
 */
'use strict';

    //--------------------------------------Function to initiate computer's selections--------------------------------//
    var sequence = [];
    var squares = $(".square");
    var enableClicks = false;
    var counter = 0;
    var round = 1;
    var score = 0;
    var person = '';
    var highscoreArray = [];

    //--------------------------------------Generates a random number-------------------------------------------------//
    var getRandomSquare = function () {
        return squares[Math.floor((Math.random() * 4))];
    };

    //--------------------------------------Function to assign Random square to sequence------------------------------//
    var assignRandomNumber = function () {
        sequence.push(getRandomSquare());
    };

    //--------------------------------------Function to assign number to box------------------------------------------//
    var animateComputerSequence = function () {
        var duration = 500;
        sequence.forEach(function (element) {
            setTimeout(function () {
                animateSquare(element)
            }, duration);
            duration += 500;
        });
    };

    //--------------------------------------Function to initiate computer's Turn--------------------------------------//
    var computerTurn = function () {
        assignRandomNumber();
        animateComputerSequence();
        userTurn();
    };

    //--------------------------------------Function to clear userArray-----------------------------------------------//
    var resetCounter = function () {
        counter = 0;
        enableClicks = false;
    };

    //--------------------------------------Function to Animate square------------------------------------------------//
    var animateSquare = function (square) {
        $(square).addClass("active");
        setTimeout(function () {
            $(square).removeClass("active")
        }, 250);
    };

    //--------------------------------------Function for the user's turn----------------------------------------------//
    var userTurn = function () {
        enableClicks = true;
    };

    $('.square').click(function() {
        if (enableClicks) {
            animateSquare(this);
            if (sequence[counter] == this) {
                ++counter;
                if (counter == sequence.length) {
                    ++round;
                    resetCounter();
                    $('#round').html(round);
                    setTimeout(function () {
                        computerTurn();
                    }, 500);
                }
            } else {
                score = round - 1;
                $('#loser').addClass('loserClass');
                setTimeout(function () {
                    $('#loser').removeClass('loserClass');
                    $('#round').html('');
                }, 2250);
                highscore();
                resetCounter();
            }
        }
    });

    //--------------------------------------Function to add score to leaderboard--------------------------------------//
    var highscore = function () {
        var scoreObject = {
            'name': person,
            'score': score
        };

        highscoreArray.push(scoreObject);
        highscoreArray.sort(function (a, b) {
            if (a.score < b.score) {
                return 1;
            }
            if (a.value > b.value) {
                return -1;
            }
            return 0;
        });

        if (highscoreArray.length == 1) {
            $('#first-name').html(highscoreArray[0].name);
            $('#first-score').html(highscoreArray[0].score);
        } else if (highscoreArray.length == 2) {
            $('#first-name').html(highscoreArray[0].name);
            $('#first-score').html(highscoreArray[0].score);
            $('#second-name').html(highscoreArray[1].name);
            $('#second-score').html(highscoreArray[1].score);
        } else if (highscoreArray.length == 3) {
            $('#first-name').html(highscoreArray[0].name);
            $('#first-score').html(highscoreArray[0].score);
            $('#second-name').html(highscoreArray[1].name);
            $('#second-score').html(highscoreArray[1].score);
            $('#third-name').html(highscoreArray[2].name);
            $('#third-score').html(highscoreArray[2].score);
        } else if (highscoreArray.length == 4) {
            $('#first-name').html(highscoreArray[0].name);
            $('#first-score').html(highscoreArray[0].score);
            $('#second-name').html(highscoreArray[1].name);
            $('#second-score').html(highscoreArray[1].score);
            $('#third-name').html(highscoreArray[2].name);
            $('#third-score').html(highscoreArray[2].score);
            $('#fourth-name').html(highscoreArray[3].name);
            $('#fourth-score').html(highscoreArray[3].score);
        } else if (highscoreArray.length >= 5) {
            $('#first-name').html(highscoreArray[0].name);
            $('#first-score').html(highscoreArray[0].score);
            $('#second-name').html(highscoreArray[1].name);
            $('#second-score').html(highscoreArray[1].score);
            $('#third-name').html(highscoreArray[2].name);
            $('#third-score').html(highscoreArray[2].score);
            $('#fourth-name').html(highscoreArray[3].name);
            $('#fourth-score').html(highscoreArray[3].score);
            $('#fifth-name').html(highscoreArray[4].name);
            $('#fifth-score').html(highscoreArray[4].score);
        }
    };

    var advance = function () {
        if ($('#mode').val() == 'advance') {
            $('.square').css('background-color', 'gray');
        } else {
            $('#red').css('background-color', 'red');
            $('#blue').css('background-color', 'blue');
            $('#green').css('background-color', 'green');
            $('#purple').css('background-color', 'purple');
        }
    };

    //--------------------------------------Start a new game----------------------------------------------------------//
    $('#new-game').click(function () {
        advance();
        person = prompt("Please enter your name", "First Name");
        round = 1;
        $('#round').html(round);
        sequence = [];
        computerTurn();
    });