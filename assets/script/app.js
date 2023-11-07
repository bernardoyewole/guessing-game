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
const button = select('button')
const result = select('.result');

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

let myNumber = getRandomNumber();

onEvent('click', button, () => {
    let inputNum = Number.parseFloat(input.value);
    if (isValid(inputNum)) {
        if (inputNum === myNumber) {
            result.innerText = `You won!!`
        } else {
            guesses--;
            numberOfGuesses.innerText = guesses;
            if (inputNum > myNumber) {
                result.innerText = `My number is smaller`
            } else {
                result.innerText = `My number is higher`
            }
        }
    } 
})