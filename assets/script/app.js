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
const hint = select('.hint');
const result = select('.result');
const resultContent = select('.result h1');
const background = select('.background')

// const heading = select('h1');

let guesses = 5;

onEvent('load', window, () => {
    restart.classList.add('hidden');
    input.value = '';
    numberOfGuesses.innerText = guesses;
    result.classList.add('hidden');
});

function getRandomNumber() {
    return Math.floor(Math.random() * (10 - 1) + 1);
}

function isValid(arg) {
    if (arg !== '' && !isNaN(arg)) {
        return true;
    } else {
        hint.innerText = `Please, enter a number between 1 and 10 :)`;
    }
}

function hint(num1, num2) {
    if (num1 > num2) {
        hint.innerText = `My number is lower`;
    } else if (num1 < num2) {
        hint.innerText = `My number is higher`;
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
        resultContent.innerText = 'Game Over';
        result.classList.remove('hidden');
        result.classList.add('visible');
        restart.classList.remove('hidden');
        background.classList.add('bg-blur');
    }
}

function win(input, num) {
    if (input === num) {
        resultContent.innerText = 'You Win!!';
        result.classList.remove('hidden');
        result.classList.add('visible');
        restart.classList.remove('hidden');
        background.classList.add('bg-blur');
    }
}

let myNumber = getRandomNumber();

onEvent('click', guessBtn, () => {
    let inputNum = Number.parseFloat(input.value);

    if (isValid(inputNum) && guessIsValid(guesses)) {
        if (inputNum === myNumber) {
            win(inputNum, myNumber);
        } else {
            guesses--;
            numberOfGuesses.innerText = guesses;
            hint(inputNum, myNumber);
        }
    }
    
    gameOver(guesses);
});

