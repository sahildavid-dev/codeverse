"use strict";
exports.__esModule = true;
var Move;
(function (Move) {
    Move["Rock"] = "rock";
    Move["Paper"] = "paper";
    Move["Scissors"] = "scissors";
    Move["Lizard"] = "lizard";
    Move["Spock"] = "spock";
})(Move = exports.Move || (exports.Move = {}));
var rules = (_a = {},
    _a[Move.Rock] = [
        { rule: Move.Scissors, explanation: "crushes" },
        { rule: Move.Lizard, explanation: "crushes" },
    ],
    _a[Move.Paper] = [
        { rule: Move.Rock, explanation: "covers" },
        { rule: Move.Spock, explanation: "disproves" },
    ],
    _a[Move.Scissors] = [
        { rule: Move.Paper, explanation: "cuts" },
        { rule: Move.Lizard, explanation: "decapitates" },
    ],
    _a[Move.Lizard] = [
        { rule: Move.Spock, explanation: "poisons" },
        { rule: Move.Paper, explanation: "eats" },
    ],
    _a[Move.Spock] = [
        { rule: Move.Scissors, explanation: "smashes" },
        { rule: Move.Rock, explanation: "vaporizes" },
    ],
    _a);
function generateRandomMove() {
    var moves = Object.values(Move);
    var randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}
exports.generateRandomMove = generateRandomMove;
function rpsls(player, opponent) {
    if (opponent === void 0) { opponent = generateRandomMove(); }
    if (player === opponent) {
        return {
            result: "draw",
            reason: "Both chose " + player.toUpperCase() + ". It's a draw."
        };
    }
    var playerRules = rules[player];
    var winRule = playerRules.find(function (r) { return r.rule === opponent; });
    if (winRule) {
        return {
            result: "win",
            reason: player.toUpperCase() + " " + winRule.explanation + " " + opponent.toUpperCase()
        };
    }
    // Check reverse rule for explanation
    var opponentRules = rules[opponent];
    var loseRule = opponentRules.find(function (r) { return r.rule === player; });
    if (loseRule) {
        return {
            result: "lose",
            reason: opponent.toUpperCase() + " " + loseRule.explanation + " " + player.toUpperCase()
        };
    }
}
exports.rpsls = rpsls;
if (typeof window !== "undefined") {
    window.rpsls = rpsls;
}
var _a;
