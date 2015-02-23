"use strict";
// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');
var race = require('../../src/race/race');

describe('Race spec', function() {

    before(function() {
    });

    // load  before each test
    beforeEach(function(done) {
        done();
    });

    it('set up race correctly', function() {
        race.setupRace(['Do', 'Re', 'Mi']);
        var currentRace = race.currentRace();
        assert.deepEqual(currentRace, [{name: 'Do', score: 0, lane: 1, color: 'red'}, {name: 'Re', score: 0, lane: 2, color: 'green'}, {name: 'Mi', score: 0, lane: 3, color: 'orange'}]);
    });

    it('add score for ball toss to lane', function() {
        race.setupRace(['Do', 'Re', 'Mi']);
        race.ballToss(2, 10);
        race.ballToss(2, 5);
        race.ballToss(3, 5);
        var currentRace = race.currentRace();
        assert.deepEqual(currentRace, [{name: 'Do', score: 0, lane: 1, color: 'red'}, {name: 'Re', score: 15, lane: 2, color: 'green'}, {name: 'Mi', score: 5, lane: 3, color: 'orange'}]);
    });

    it('return false if there is no race winner', function() {
        race.setupRace(['Do', 'Re', 'Mi']);
        race.ballToss(2, 10);
        assert.equal(race.isWinner(), false);
    });

    it('return true if there is no race winner', function() {
        race.setupRace(['Do', 'Re', 'Mi']);
        race.ballToss(2, 60);
        race.ballToss(2, 60);
        race.ballToss(2, 60);
        race.ballToss(2, 60);
        assert.equal(race.isWinner(), true);
    });

    it('add score for ball toss to lane', function() {
        race.setupRace(['Do', 'Re', 'Mi']);
        race.ballToss(2, 10);
        race.ballToss(2, 5);
        race.ballToss(3, 5);
        var racePositions = race.racePositions();
        assert.deepEqual(racePositions, [{name: 'Re', score: 15, lane: 2, color: 'green'}, {name: 'Mi', score: 5, lane: 3, color: 'orange'}, {name: 'Do', score: 0, lane: 1, color: 'red'}]);
    });

    it('calculate the winner of the race correctly', function() {
        var input = "Star, Dakota, Cheyenne, Misty, Spirit\r\n1 60\r\n3 5\r\n1 60\r\n4 5\r\n4 10\r\n2 5\r\n5 10\r\n1 60\r\n3 20\r\n7 10\r\n1 40\r\n2 60";
        race.letsgo(input);
        var racePositions = race.racePositions();
        assert.deepEqual(racePositions, [{name:"Star",score:220,lane:1, color: 'red'},{name:"Cheyenne",score:25,lane:3, color: 'orange'},{name:"Misty",score:15,lane:4, color: 'yellow'},{name:"Spirit",score:10,lane:5, color: 'purple'},{name:"Dakota",score:5,lane:2, color: 'green'}]);
    });
});