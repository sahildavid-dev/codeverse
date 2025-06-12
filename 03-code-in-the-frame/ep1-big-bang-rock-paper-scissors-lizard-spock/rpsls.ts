type Result = "win" | "lose" | "draw";

export enum Move {
	Rock = "rock",
	Paper = "paper",
	Scissors = "scissors",
	Lizard = "lizard",
	Spock = "spock",
}

type Rule = {
	rule: Move;
	explanation: string;
};

const rules: Record<Move, Rule[]> = {
	[Move.Rock]: [
		{ rule: Move.Scissors, explanation: "crushes" },
		{ rule: Move.Lizard, explanation: "crushes" },
	],
	[Move.Paper]: [
		{ rule: Move.Rock, explanation: "covers" },
		{ rule: Move.Spock, explanation: "disproves" },
	],
	[Move.Scissors]: [
		{ rule: Move.Paper, explanation: "cuts" },
		{ rule: Move.Lizard, explanation: "decapitates" },
	],
	[Move.Lizard]: [
		{ rule: Move.Spock, explanation: "poisons" },
		{ rule: Move.Paper, explanation: "eats" },
	],
	[Move.Spock]: [
		{ rule: Move.Scissors, explanation: "smashes" },
		{ rule: Move.Rock, explanation: "vaporizes" },
	],
};

export function generateRandomMove(): Move {
	const moves = Object.values(Move);
	const randomIndex = Math.floor(Math.random() * moves.length);
	return moves[randomIndex];
}

export function rpsls(
	player: Move,
	opponent: Move = generateRandomMove()
): { result: Result; reason: string } | undefined {
	if (player === opponent) {
		return {
			result: "draw",
			reason: `Both chose ${player.toUpperCase()}. It's a draw.`,
		};
	}

	const playerRules = rules[player];
	const winRule = playerRules.find((r) => r.rule === opponent);

	if (winRule) {
		return {
			result: "win",
			reason: `${player.toUpperCase()} ${
				winRule.explanation
			} ${opponent.toUpperCase()}`,
		};
	}

	// Check reverse rule for explanation
	const opponentRules = rules[opponent];
	const loseRule = opponentRules.find((r) => r.rule === player);
	if (loseRule) {
		return {
			result: "lose",
			reason: `${opponent.toUpperCase()} ${
				loseRule.explanation
			} ${player.toUpperCase()}`,
		};
	}
}

// Export the function for testing and global access
declare global {
	interface Window {
		rpsls: typeof rpsls;
	}
}
if (typeof window !== "undefined") {
	window.rpsls = rpsls;
}
