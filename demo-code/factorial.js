// This function calculates the factorial of a number
function factorial(n) {
	if (n < 0) {
		return "Error: Negative input is not allowed";
	}
	let result = 1;
	for (let i = 2; i <= n; i++) {
		result *= i;
	}
	return result;
}

console.log(factorial(5)); // Expected output: 120
console.log(factorial(-1)); // Expected output: Error: Negative input is not allowed
