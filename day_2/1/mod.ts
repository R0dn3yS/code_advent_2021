let depth = 0;
let horPos = 0;

function calcPos(instructions: string[]) {
	for (const instruction of instructions) {
		const [direction, amount] = instruction.split(' ');

		if (direction === 'forward') {
			horPos += parseInt(amount);
		} else if (direction === 'down') {
			depth += parseInt(amount);
		} else if (direction === 'up') {
			depth -= parseInt(amount);
		}
	}
	console.log(depth * horPos);
}

const text = Deno.readTextFileSync('input.txt');
const textByLine = text.split('\n');

calcPos(textByLine);
