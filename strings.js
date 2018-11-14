#!/usr/bin/env node

const [a, b] = process.argv.slice(2);
const toLower = str => str.split("").map(c => c.toLowerCase()).join("");
const equalLength = (a, b) => a.length === b.length;

function record(a, b, label, fn) {
	console.time(label);
	fn(a, b);
	console.timeEnd(label);
}

function slowSame(a, b) {
	if (!equalLength(a, b)) {
		return false;
	}

	a = toLower(a);
	b = toLower(b);

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

function fastSame(a, b) {
	if (!equalLength(a, b)) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] === b[i]) { // if match don't alter case
			continue;
		}
		if (toLower(a[i]) !== toLower(b[i])) { // if no match, break early
			return false;
		}
	}
	return true;
}

record(a, b, 'slow', slowSame);
record(a, b, 'fast', fastSame);
