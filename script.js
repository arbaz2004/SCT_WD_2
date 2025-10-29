let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 1000);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  display.textContent = "00:00:00";
  difference = 0;
  lapCounter = 1;
  lapsList.innerHTML = "";
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  difference = updatedTime;
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  display.textContent =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}

function addLap() {
  if (running) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    lapsList.appendChild(li);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
