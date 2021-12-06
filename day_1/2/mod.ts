let cur = 0;
let curSum = 0;
const prevArray: number[] = [];
let prevSum = 0;
let count = 0;

function countMeasures(measurements: string[]) {
	for (const measure of measurements) {
		cur = parseInt(measure);

		prevArray.push(cur);

		if (prevArray.length > 3) {
			prevArray.shift();
			curSum = 0;
			for (const num of prevArray) {
				curSum += num;
			}
		}

		if (curSum > prevSum) {
			count++;
		}

		prevSum = curSum;
	}
	console.log(count);
}

const text = Deno.readTextFileSync('input.txt');
const textByLine = text.split('\n');

countMeasures(textByLine);
