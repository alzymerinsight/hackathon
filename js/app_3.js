const squares = document.querySelectorAll('.square');
const time_left = document.querySelector("#time-left");
const score = document.querySelector('#score');

let result = 0;
let hitposition;
let currentTime = 10;
let timerId = null;
let countDownTimerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
        square.style.backgroundImage = 'none'; // Remove any background image from previous rounds
    });

    // Select a random square to be the mole
    const randomIndex = Math.floor(Math.random() * squares.length);
    const randomSquare = squares[randomIndex];
    randomSquare.classList.add('mole');
    randomSquare.style.backgroundImage = "url('./img/mole-icon-21.jpeg')"; 
    hitposition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitposition) {
            console.log('hit');
            result++;
            score.textContent = result;
            hitposition = null;
            square.style.backgroundImage = 'none'; // Remove the mole image when it's hit
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
    currentTime--;
    time_left.textContent = "Time Left : " + currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId); // Clear the interval for moving mole
        alert('Game Over. Your Final score is ' + result);
    }
}

countDownTimerId = setInterval(countDown, 1000);
