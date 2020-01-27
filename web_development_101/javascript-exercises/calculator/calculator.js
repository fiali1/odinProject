function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function sum (array) {
	let sum = 0;
	for(let i = 0; i < array.length; i++)
		sum += array[i];
	return sum;
}

function multiply (array) {
	let multiply = 1;
	for(let i = 0; i < array.length; i++)
		multiply *= array[i];
	return multiply;
}

function power(a, b) {
	return a ** b;
}

function factorial(a) {
	if(a == 0)
		return 1;
	return a * factorial(a - 1);
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}