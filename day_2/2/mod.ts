let depth = 0;
let horPos = 0;
let aim = 0;

function calcPos(instructions: string[]) {
    for (const instruction of instructions) {
        const [direction, amount] = instruction.split(' ');

        if (direction === 'forward') {
            horPos += parseInt(amount);
            depth += aim * parseInt(amount);
        } else if (direction === 'down') {
            aim += parseInt(amount);
        } else if (direction === 'up') {
            aim -= parseInt(amount);
        }
    }
    console.log(depth * horPos);
}

const text = Deno.readTextFileSync('input.txt');
const textByLine = text.split('\n');

calcPos(textByLine);