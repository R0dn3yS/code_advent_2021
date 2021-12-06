const input = Deno.readTextFileSync('./input.txt');

class Board {
	#board: (number | undefined)[][];

	#won = false;

	constructor(input: string) {
		this.#board = input.split('\n').map((row) => {
			return row.trimLeft().split(/\ +/).map(Number);
		});
	}

	get won(): boolean {
		return this.#won;
	}

	get unmarkedSum(): number {
		let sum = 0;
		for (const row of this.#board) {
			for (const cell of row) {
				if (cell) {
					sum += cell;
				}
			}
		}
		return sum;
	}

	get transpose(): (number | undefined)[][] {
		return this.#board[0].map((_, j) => {
			return this.#board.map((row) => row[j]);
		});
	}

	/** Return if this bingo board has won after calling this number */
	isWinner(num: number): boolean {
		if (this.#hasNumber(num)) {
			return this.#won = this.rowWon() || this.colWon();
		}
		return false;
	}

	/** Simulate calling a number and return if this board has it */
	#hasNumber(num: number): boolean {
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				if (this.#board[i][j] === num) {
					this.#board[i][j] = undefined;
					return true;
				}
			}
		}
		return false;
	}

	/** Is there a row which as won? */
	rowWon(): boolean {
		return this.#board.some((row) => {
			return row.every((cell) => cell === undefined);
		});
	}

	/** Is there a col which as won? */
	colWon(): boolean {
		return this.transpose.some((col) => {
			return col.every((cell) => cell === undefined);
		});
	}
}

function part1(input: string): number {
	const [numsinput, ...boardsinput] = input.split('\n\n');
	const nums = numsinput.split(',').map(Number);
	const boards = boardsinput.map((boardDatum) => new Board(boardDatum));
	for (const num of nums) {
		for (const board of boards) {
			if (board.isWinner(num)) {
				return num * board.unmarkedSum;
			}
		}
	}
	return NaN;
}

function part2(input: string): number {
	const [numsinput, ...boardsinput] = input.split('\n\n');
	const nums = numsinput.split(',').map(Number);
	let boards = boardsinput.map((boardDatum) => new Board(boardDatum));
	let score = NaN;
	for (const num of nums) {
		for (const board of boards) {
			if (board.isWinner(num)) {
				score = num * board.unmarkedSum;
			}
		}
		boards = boards.filter((board) => !board.won);
	}
	return score;
}

console.log(part1(input));
console.log(part2(input));
