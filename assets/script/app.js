'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}  
  
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// Main
const numberOfGuesses = select('.num-guess span');
const restart = select('.restart');
const input = select('.input');
const guessBtn = select('.guess')
const result = select('.result');
// const heading = select('h1');

let guesses = 5;

onEvent('load', window, () => {
    restart.classList.add('hidden');
    input.value = '';
    numberOfGuesses.innerText = guesses;
});

function getRandomNumber() {
    return Math.floor(Math.random() * (10 - 1) + 1);
}

function isValid(arg) {
    if (arg !== '' && !isNaN(arg)) {
        return true;
    } else {
        result.innerText = `Please, enter a number between 1 and 10 :)`
    }
}

function compare(num1, num2) {
    if (num1 > num2) {
        result.innerText = `My number is smaller`;
    } else if (num1 < num2) {
        result.innerText = `My number is higher`;
    }
}

function guessIsValid(num) {
    if (num > 0) {
        return true;
    }
    return false;
}

function gameOver(num) {
    if (num === 0) {
        result.innerText = `Game Over`;
        result.classList.add('game-overgame')
        restart.classList.remove('hidden');
    }
}

let myNumber = getRandomNumber();

onEvent('click', guessBtn, () => {
    let inputNum = Number.parseFloat(input.value);

    if (isValid(inputNum) && guessIsValid(guesses)) {
        if (inputNum === myNumber) {
            result.innerText = `You won!!`;
            restart.classList.remove('hidden');
        } else {
            guesses--;
            numberOfGuesses.innerText = guesses;
            compare(inputNum, myNumber);
        }
    }
    
    gameOver(guesses);
});

