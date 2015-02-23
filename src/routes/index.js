"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var express = require("express");
var router = express.Router();
var _ = require("lodash");

var race = _interopRequireWildcard(require("../race/race"));

/* GET home page. */
router.get("/", function (req, res) {
   res.render("index", { validationMessages: [], input: "" });
});

router.post("/startRace", function (req, res) {
   var validMessages = race.validInput(req.body.input);

   if (validMessages.length == 0) {
      race.letsgo(req.body.input);
      res.render("raceResults", { results: race.racePositions(), race: race.currentRace() });
   } else {
      res.render("index", { validationMessages: validMessages, input: req.body.input });
   }
});

module.exports = router;