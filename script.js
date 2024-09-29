let startTime, updatedTime, difference, tInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startPauseBtn.innerText = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.innerText = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startTime = undefined;
    difference = 0;
    display.innerHTML = '00:00:00.000';
    startPauseBtn.innerText = 'Start';
    isRunning = false;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapCount = 0;
    laps.innerHTML = '';
}

function lap() {
    lapCount++;
    const li = document.createElement('li');
    li.innerText = `Lap ${lapCount}: ${display.innerText}`;
    laps.appendChild(li);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));
    
    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    let s = '000' + num;
    return s.substr(s.length - size);
}

startPauseBtn.addEventListener('click', startPause);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);