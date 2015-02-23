"use strict";

let race = [];
var _ = require('lodash');
const validScores = [5, 5, 5, 5, 10, 10, 10, 20, 20, 40, 60];

function setupRace(racers) {
    let lane = 0;
    let color = ['red', 'green', 'orange', 'yellow', 'purple', 'blue'];
    race = _.map(racers, racer => {
                            lane = lane + 1;
                            return {name: racer, score: 0, lane: lane, color: color[lane - 1]}
                        });
}

function ballToss(lane, score) {
    if (_.contains(validScores, score)) {
        race[lane - 1].score = race[lane - 1].score + score;
    }
}

function isWinner() {
    let winnerArray = _.find(race, racer => {  return racer.score >= 220;});
    return (winnerArray !== undefined);
}

function racePositions() {
    return _.sortBy(race, 'score').reverse()
}

function currentRace() {
    return race;
}

function splitInput(gameLines) {
    return gameLines.split("\r\n")
}

function letsgo(gameLines){
     var gameLines = splitInput(gameLines);
     var racers = gameLines[0].split(', ');
     setupRace(racers);
     _.forEach(_.tail(gameLines), gameLine => {
          if (isWinner() == false) {
             let toss = gameLine.split(" ");
             let lane = parseInt(toss[0]);
             let score = parseInt(toss[1]);
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
        let racers = gameLines[0].split(', ');
        if  (racers.length < 1) {
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

module.exports = {
    setupRace,
    currentRace,
    ballToss,
    isWinner,
    racePositions,
    letsgo,
    validInput
};