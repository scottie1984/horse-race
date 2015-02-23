"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

var race = [];
var _ = require("lodash");
var validScores = [5, 5, 5, 5, 10, 10, 10, 20, 20, 40, 60];

function setupRace(racers) {
    var lane = 0;
    var color = ["red", "green", "orange", "yellow", "purple", "blue"];
    race = _.map(racers, function (racer) {
        lane = lane + 1;
        return { name: racer, score: 0, lane: lane, color: color[lane - 1] };
    });
}

function ballToss(lane, score) {
    if (_.contains(validScores, score)) {
        race[lane - 1].score = race[lane - 1].score + score;
    }
}

function isWinner() {
    var winnerArray = _.find(race, function (racer) {
        return racer.score >= 220;
    });
    return winnerArray !== undefined;
}

function racePositions() {
    return _.sortBy(race, "score").reverse();
}

function currentRace() {
    return race;
}

function splitInput(gameLines) {
    return gameLines.split("\r\n");
}

function letsgo(gameLines) {
    var _splitInput = splitInput(gameLines);

    var _splitInput2 = _toArray(_splitInput);

    var racersLine = _splitInput2[0];

    var game = _splitInput2.slice(1);

    var racers = racersLine.split(", ");
    setupRace(racers);
    _.forEach(game, function (gameLine) {
        if (isWinner() == false) {
            var _gameLine$split$map = gameLine.split(" ").map(function (x) {
                return parseInt(x);
            });

            var _gameLine$split$map2 = _slicedToArray(_gameLine$split$map, 2);

            var lane = _gameLine$split$map2[0];
            var score = _gameLine$split$map2[1];

            if (lane > 0 && lane < racers.length + 1) {
                ballToss(lane, score);
            }
        } else {
            //game is over - this breaks the iteration on lines
            false;
        }
    });
}

function validInput(gameLines) {
    var validMessages = [];
    var gameLines = splitInput(gameLines);
    if (gameLines.length > 1) {
        var racers = gameLines[0].split(", ");
        if (racers.length < 1) {
            validMessages.push("Must be a racer");
        }
        if (racers.length > 7) {
            validMessages.push("Can only be 7 racers");
        }
    } else {
        validMessages.push("Must enter some game data");
    }
    return validMessages;
}

exports.setupRace = setupRace;
exports.currentRace = currentRace;
exports.ballToss = ballToss;
exports.isWinner = isWinner;
exports.racePositions = racePositions;
exports.letsgo = letsgo;
exports.validInput = validInput;
Object.defineProperty(exports, "__esModule", {
    value: true
});