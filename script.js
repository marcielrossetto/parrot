const parrots = [
    '🐦', '🐦', 
    '🦜', '🦜', 
    '🦅', '🦅', 
    '🐤', '🐤', 
    '🕊', '🕊', 
    '🦉', '🦉', 
    '🐧', '🐧',
    '🐦', '🐦', 
    '🦜', '🦜', 
    '🦅', '🦅', 
    '🐤', '🐤', 
    '🕊', '🕊', 
    '🦉', '🦉', 
    '🐧', '🐧'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameContainer = document.querySelector('.game-container');

function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(parrot) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = parrot;
    
    card.addEventListener('click', flipCard);
    return card;
}

function setupGame() {
    shuffleArray(parrots);
    parrots.forEach(parrot => {
        const card = createCard(parrot);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

setupGame();