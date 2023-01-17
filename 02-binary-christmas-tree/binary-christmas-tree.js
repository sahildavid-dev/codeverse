/**
 * Functions to create Binary Christmas Tree.
 * 
 * Author: Sahil David <sahildavid.dev@gmail.com>
 */

// Message to make tree from
const MSG_TREE = 'Christmas brings peace, joy and hope.';
const MSD_WOOD = 'John 3:16';

/**
 * Function to change string into binary format
 * @param {String} input - input to change into binary format
 * @returns - binary string
 */
function changeToBinary (input) {
    let binary = '';
    for (let i = 0; i < input.length; i++) {
        binary += input[i].charCodeAt(0).toString(2) + ' ';
    }
    return binary;
}

/**
 * Function to create binary tree from the message
 */
function createBinaryTree () {
	const message = changeToBinary(MSG_TREE);
	const canvas = document.querySelector('.js-canvas');

	let counter = 0;
    let characterLimit = 1;

	while (counter < message.length) {
        let row = '';
        for (let i = 0; i < characterLimit; i++) {
            if (counter > message.length) { return; }

            const char = message[counter] === ' ' ? '-' : message[counter];
            const className = char === '1' ? 'one' : 'default' ;

            row += `<span class="${className}">${char}</span>`;
            counter++;
        }
        characterLimit += 2;

        const rowElm = document.createElement('div');
        rowElm.innerHTML += row;

        canvas.append(rowElm);
    }
}

/**
 * Function to create binary tree trunk from the message
 */
function createTrunk () {
	const message = changeToBinary(MSD_WOOD);
	const trunk = document.querySelector('.js-trunk');

	let counter = 0;
    let characterLimit = 12;
    while (counter < message.length) {
        let row = '';
        for (let i = 0; i < characterLimit; i++) {
            if (counter > message.length) { return; }

            const char = message[counter] === ' ' ? '-' : message[counter];

            row += `<span>${char}</span>`;
            counter++;
        }
        const rowElm = document.createElement('div');
        rowElm.innerHTML += row;

        trunk.append(rowElm);
    }
}


(() => {
	createBinaryTree();
	createTrunk();
})();