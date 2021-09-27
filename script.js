const holes = document.querySelectorAll('.hole');
const golds = document.querySelectorAll('.gold')
const scores = document.querySelector('.score');
const count = document.querySelector('.countDown');
const startButton = document.querySelector('.start')

let lastHole;
let timeUp;
let timeLimit = 20000;
let score = 0;
let countDown;

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes)
  }
  lastHole = hole;
  return hole;
}

function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(function() {
    hole.classList.remove("up");
    if (!timeUp) popOut();
  }, time)
}


function startGame() {
  countDown = timeLimit / 1000;
  scores.texContent = 0;
  scores.style.display = 'block';
  count.texContent = countDown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(function() {
    timeUp = true;
  }, timeLimit);

  let startCountDown = setInterval(function() {
    countDown -= 1;
    count.textContent = countDown;
    if (countDown < 0) {
      countDown = 0;
      clearInterval(startCountDown);
      count.textContent = 'Not all treasure is silver and gold, mate.';
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);


function mine(e) {
  score++;
  this.style.backgroundImage = 'url("coin1.png")';
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    this.style.backgroundImage = 'url("coin.png")';
    this.style.pointerEvents = 'all';
  }, 800);
  scores.textContent = score;
}
golds.forEach(gold => gold.addEventListener('click', mine));
