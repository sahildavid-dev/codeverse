/**
 * Function to apply typewriter animation.
 * Also, updates the word after the next animation
 * 
 * Author: Sahil David <sahildavid.dev@gmail.com>
 */

// Word to update 
const words = ['Developer', 'Educator', 'Friend', 'Blogger'];

// Variable to control animations
let counter = 0;
const timer = 1000;
const typeTimer = 100;

/**
 * Function to apply animation that changes word after typewriter effect
 */
function applyAnimation () {
	const target = document.querySelector('.js-target')
	if (!target) { return; }

	// Typewriter Animation
	typeWriter(target, words[counter]);
	counter++

	if (counter >= words.length) {
		counter = 0
	}

	if (counter < words.length) {
		setTimeout(applyAnimation, timer)
	}
}

/**
 * Function to apply typewriter effect to the word
 * @param {HTMLElement} target - element for updated animated word 
 * @param {String} word - word to use for the animation
 * @param {Number} count - count of letters in animation
 */
function typeWriter (target, word, count = 0) {
	if (count === 0) {
		target.innerHTML = ''
	}
	target.innerHTML += word[count]

	if (count++ < word.length - 1) {
		setTimeout(() => typeWriter(target, word, count), typeTimer)
	}
}

/**
 * Call the animation function
 */
applyAnimation();