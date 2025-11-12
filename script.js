const startStop = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const timeDisplay = document.getElementById('time');
const progress = document.getElementById('progress');
const lapsDiv = document.getElementById('laps');

let startTime = 0, elapsed = 0, running = false, rafId, laps = [];
const circumference = 2 * Math.PI * 54;

function format(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function update() {
  const now = performance.now();
  const diff = elapsed + (running ? now - startTime : 0);
  timeDisplay.textContent = format(diff);
  const offset = circumference * (1 - ((diff % 60000) / 60000));
  progress.style.strokeDashoffset = offset;
  if (running) rafId = requestAnimationFrame(update);
}

startStop.onclick = () => {
  if (!running) {
    running = true;
    startTime = performance.now();
    startStop.textContent = 'Pause';
    startStop.classList.remove('start');
    startStop.classList.add('stop');
    rafId = requestAnimationFrame(update);
  } else {
    running = false;
    elapsed += performance.now() - startTime;
    startStop.textContent = 'Start';
    startStop.classList.remove('stop');
    startStop.classList.add('start');
    cancelAnimationFrame(rafId);
  }
};

resetBtn.onclick = () => {
  running = false;
  elapsed = 0;
  cancelAnimationFrame(rafId);
  timeDisplay.textContent = '00:00:00';
  progress.style.strokeDashoffset = circumference;
  laps = [];
  lapsDiv.innerHTML = '<p style="text-align:center;color:var(--muted);">No laps yet</p>';
  startStop.textContent = 'Start';
  startStop.classList.remove('stop');
  startStop.classList.add('start');
};

lapBtn.onclick = () => {
  if (!running) return;
  const total = elapsed + (performance.now() - startTime);
  const prev = laps.length ? laps[laps.length - 1].time : 0;
  const diff = total - prev;
  laps.push({ time: total, diff });
  renderLaps();
};

function renderLaps() {
  lapsDiv.innerHTML = '';
  for (let i = laps.length - 1; i >= 0; i--) {
    const lap = laps[i];
    const div = document.createElement('div');
    div.className = 'lap';
    div.innerHTML = `<span>Lap ${i + 1}</span><strong>${format(lap.time)}</strong>`;
    lapsDiv.appendChild(div);
  }
}

update();
