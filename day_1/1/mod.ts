let cur = 0;
let prev = 0;
let count = 0;

function countMeasures(measurements: string[]) {
	for (const measure of measurements) {
		cur = parseInt(measure);
		if (cur > prev && prev !== 0) {
			count++;
		}
		prev = cur;
	}
	console.log(count);
}

const text = Deno.readTextFileSync('input.txt');
const textByLine = text.split('\n');

countMeasures(textByLine);
