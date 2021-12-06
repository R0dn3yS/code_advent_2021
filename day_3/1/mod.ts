const diagnostics = Deno.readTextFileSync('./input.txt').split('\r\n');

const msb = diagnostics[0]
	.split('')
	.map((_v, index) =>
		diagnostics.reduce((sum, bits) => (sum += parseInt(bits[index])), 0)
	);

const gamma = parseInt(
	msb.map((b) => (b > diagnostics.length / 2 ? 1 : 0)).join(''),
	2,
);

const epsilon = gamma ^ parseInt('1'.repeat(diagnostics[0].length), 2);

console.log('Response:', gamma, epsilon, gamma * epsilon);
