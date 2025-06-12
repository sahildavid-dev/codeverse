import { describe, expect, it } from "vitest";
import { rpsls, Move, generateRandomMove } from "./rpsls";

describe("Big Bang: Rock, Paper, Scissors, Lizard, Spock", () => {
	// Draws
	it.each([
		[Move.Rock],
		[Move.Paper],
		[Move.Scissors],
		[Move.Lizard],
		[Move.Spock],
	])('should return "draw" when both moves are %s', (move) => {
		const result = rpsls(move, move);
		expect(result?.result).toBe("draw");
		expect(result?.reason).toMatch(/draw/i);
	});

	// Win/Lose cases
	const cases: [Move, Move, "win" | "lose", string][] = [
		// Rock
		[Move.Rock, Move.Scissors, "win", "ROCK crushes SCISSORS"],
		[Move.Rock, Move.Lizard, "win", "ROCK crushes LIZARD"],
		[Move.Rock, Move.Paper, "lose", "PAPER covers ROCK"],
		[Move.Rock, Move.Spock, "lose", "SPOCK vaporizes ROCK"],

		// Paper
		[Move.Paper, Move.Rock, "win", "PAPER covers ROCK"],
		[Move.Paper, Move.Spock, "win", "PAPER disproves SPOCK"],
		[Move.Paper, Move.Scissors, "lose", "SCISSORS cuts PAPER"],
		[Move.Paper, Move.Lizard, "lose", "LIZARD eats PAPER"],

		// Scissors
		[Move.Scissors, Move.Paper, "win", "SCISSORS cuts PAPER"],
		[Move.Scissors, Move.Lizard, "win", "SCISSORS decapitates LIZARD"],
		[Move.Scissors, Move.Rock, "lose", "ROCK crushes SCISSORS"],
		[Move.Scissors, Move.Spock, "lose", "SPOCK smashes SCISSORS"],

		// Lizard
		[Move.Lizard, Move.Spock, "win", "LIZARD poisons SPOCK"],
		[Move.Lizard, Move.Paper, "win", "LIZARD eats PAPER"],
		[Move.Lizard, Move.Rock, "lose", "ROCK crushes LIZARD"],
		[Move.Lizard, Move.Scissors, "lose", "SCISSORS decapitates LIZARD"],

		// Spock
		[Move.Spock, Move.Scissors, "win", "SPOCK smashes SCISSORS"],
		[Move.Spock, Move.Rock, "win", "SPOCK vaporizes ROCK"],
		[Move.Spock, Move.Paper, "lose", "PAPER disproves SPOCK"],
		[Move.Spock, Move.Lizard, "lose", "LIZARD poisons SPOCK"],
	];

	it.each(cases)(
		"%s vs %s should be %s: %s",
		(player, opponent, expectedResult, expectedReason) => {
			const result = rpsls(player, opponent);
			expect(result?.result).toBe(expectedResult);
			expect(result?.reason).toBe(expectedReason);
		}
	);
});

describe("generateRandomMove", () => {
	it("should return a valid Move", () => {
		const validMoves = Object.values(Move);
		for (let i = 0; i < 100; i++) {
			const move = generateRandomMove();
			expect(validMoves).toContain(move);
		}
	});
});
