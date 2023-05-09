// Game Input values
let min = 1,
    max = 15,
    guessesLeft = 3,
    winnigNum = getRandomNum(min, max);

// Get UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');

// Assign UI min ans max values
minNum.textContent = min;
maxNum.textContent = max;

// Add play again event listener
game.addEventListener('mousedown', (e) => {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Add event listener to guessBtn
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value);

    // Validate guessInput
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter number between ${min} and ${max}`, 'red');
    } // Check if won
    else if (guess === winnigNum) {
        // gameOver won
        gameOver(true, `Congratulations ${winnigNum} was correct, YOU WON!`);  
    }
    else {
        // If user input is wrong, then subtract 1 from guessesLeft
        guessesLeft -= 1;

        // Validate guessesLeft
        if (guessesLeft === 0) {
            // gameOver lost
            gameOver(false,`Sorry, you lost the correct number was ${winnigNum}`);
        }
        else {
            // Set input border red
            setMessage(`Sorry, ${guess} was incorrect, you have ${guessesLeft} guesses left`, 'red');
            // Clear the input
            guessInput.value = '';
        }
    }
});

// Define setMessage function
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// Define gameOver function
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable guessInput
    guessInput.disabled = true;
    // Set input border color to color
    guessInput.style.borderColor = color;
    // Set text color to color
    message.style.color = color;
    // Set Message
    setMessage(msg);
    
    // Set the value of guessBtn to PlayAgain
    guessBtn.value = 'PLAY AGAIN';
    // Add a className of play-again
    guessBtn.className = 'play-again';
}

function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}
