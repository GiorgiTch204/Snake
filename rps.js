const choices = document.querySelectorAll('.choice');
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.play-again');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const tiesDisplay = document.getElementById('ties');
const userAiDisplay = document.querySelector('.user-ai-display');
const userChoiceImg = document.getElementById('user-choice-img');
const aiChoiceImg = document.getElementById('ai-choice-img');

let wins = 0;
let losses = 0;
let ties = 0;
let userChoice = '';
let computerChoice = '';
let gameOver = false;

const choicesArray = ['rock', 'paper', 'scissors'];
const choiceImages = {
    'rock': 'icons/rock.png',
    'paper': 'icons/paper.png',
    'scissors': 'icons/scissors.jpg'
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (gameOver) return;

        userChoice = choice.getAttribute('data-choice');
        computerChoice = getComputerChoice();

        displayChoices(userChoice, computerChoice);
        checkWinner();
        showPlayAgain();
    });
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choicesArray[randomIndex];
}

function displayChoices(user, computer) {
    userChoiceImg.src = choiceImages[user];
    aiChoiceImg.src = choiceImages[computer];

    userChoiceImg.alt = user;
    aiChoiceImg.alt = computer;

    userAiDisplay.classList.add('show');
    userChoiceImg.classList.add('show');
    aiChoiceImg.classList.add('show');
}

function checkWinner() {
    if (userChoice === computerChoice) {
        message.textContent = `It's a tie! You both chose ${userChoice}`;
        ties++;
        tiesDisplay.textContent = ties;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        message.textContent = `You win! ${userChoice} beats ${computerChoice}`;
        wins++;
        winsDisplay.textContent = wins;
    } else {
        message.textContent = `You lose! ${computerChoice} beats ${userChoice}`;
        losses++;
        lossesDisplay.textContent = losses;
    }

    gameOver = true;
}

function showPlayAgain() {
    playAgainBtn.style.display = 'block';
    playAgainBtn.addEventListener('click', () => {
        resetGame();
    });
}

function resetGame() {
    message.textContent = 'Choose your move!';
    gameOver = false;
    playAgainBtn.style.display = 'none';

    userAiDisplay.classList.remove('show');
    userChoiceImg.classList.remove('show');
    aiChoiceImg.classList.remove('show');
}
