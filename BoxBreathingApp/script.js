const app = document.getElementById('app');

function showLandingPage() {
    app.innerHTML = `
        <button id="start-btn">Let's get started!</button>
    `;

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', showConfigPage);
}

function showConfigPage() {
    app.innerHTML = `
        <div class="config-panel">
            <h2>Settings</h2>
            <div class="config-option">
                <label for="pace-slider">Pace (seconds):</label>
                <input type="range" id="pace-slider" min="3" max="7" value="4">
                <span id="pace-value">4s</span>
            </div>
            <div class="config-option">
                <label>Duration (minutes):</label>
                <div class="duration-buttons">
                    <button class="duration-btn" data-duration="2">2</button>
                    <button class="duration-btn" data-duration="5">5</button>
                    <button class="duration-btn" data-duration="7">7</button>
                    <button class="duration-btn" data-duration="10">10</button>
                    <button class="duration-btn" data-duration="15">15</button>
                </div>
            </div>
            <div class="config-option">
                <label>Music:</label>
                <div class="music-buttons">
                    <button class="music-btn" data-music="gentle-piano">Gentle Piano</button>
                    <button class="music-btn" data-music="serene-river">Serene River</button>
                    <button class="music-btn" data-music="ambient-chimes">Ambient Chimes</button>
                </div>
            </div>
            <button id="start-breathing-btn">Start</button>
        </div>
    `;

    const paceSlider = document.getElementById('pace-slider');
    const paceValue = document.getElementById('pace-value');
    paceSlider.addEventListener('input', () => {
        paceValue.textContent = `${paceSlider.value}s`;
    });

    const durationButtons = document.querySelectorAll('.duration-btn');
    durationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            durationButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    const musicButtons = document.querySelectorAll('.music-btn');
    musicButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            musicButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            // Play a sample of the music
        });
    });

    const startBreathingBtn = document.getElementById('start-breathing-btn');
    startBreathingBtn.addEventListener('click', showBreathingPage);
}

let timerInterval;
let remainingTime;

function showBreathingPage() {
    const duration = document.querySelector('.duration-btn.selected')?.dataset.duration || 2;
    remainingTime = duration * 60;

    app.innerHTML = `
        <div class="breathing-container">
            <div class="timer">Time Remaining: ${formatTime(remainingTime)}</div>
            <div class="breathing-square">
                <div class="pacer-dot"></div>
                <div class="phase-text"></div>
            </div>
            <div class="controls">
                <button id="pause-btn">Pause</button>
                <button id="stop-btn">Stop</button>
            </div>
        </div>
    `;

    const timerDisplay = document.querySelector('.timer');
    timerInterval = setInterval(() => {
        remainingTime--;
        timerDisplay.textContent = `Time Remaining: ${formatTime(remainingTime)}`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            showCompletionPage();
        }
    }, 1000);

    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.addEventListener('click', () => {
        if (pauseBtn.textContent === 'Pause') {
            pauseBtn.textContent = 'Resume';
            clearInterval(timerInterval);
            // Pause animation
        } else {
            pauseBtn.textContent = 'Pause';
            timerInterval = setInterval(() => {
                remainingTime--;
                timerDisplay.textContent = `Time Remaining: ${formatTime(remainingTime)}`;
                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    showCompletionPage();
                }
            }, 1000);
            // Resume animation
        }
    });

    const stopBtn = document.getElementById('stop-btn');
    stopBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        showCompletionPage();
    });

    startBreathingAnimation();
}

function startBreathingAnimation() {
    const pace = document.getElementById('pace-slider')?.value || 4;
    const pacerDot = document.querySelector('.pacer-dot');
    const phaseText = document.querySelector('.phase-text');
    const breathingSquare = document.querySelector('.breathing-square');

    const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    let phaseIndex = 0;

    function animate() {
        phaseText.textContent = phases[phaseIndex];
        pacerDot.style.animation = `breathe ${pace * 4}s linear infinite`;
        breathingSquare.style.animation = `border-glow ${pace * 4}s linear infinite`;

        setTimeout(() => {
            phaseIndex = (phaseIndex + 1) % 4;
            phaseText.textContent = phases[phaseIndex];
        }, pace * 1000);

         setTimeout(() => {
            phaseIndex = (phaseIndex + 1) % 4;
            phaseText.textContent = phases[phaseIndex];
        }, pace * 2 * 1000);

         setTimeout(() => {
            phaseIndex = (phaseIndex + 1) % 4;
            phaseText.textContent = phases[phaseIndex];
        }, pace * 3 * 1000);

         setTimeout(() => {
            phaseIndex = (phaseIndex + 1) % 4;
            phaseText.textContent = phases[phaseIndex];
        }, pace * 4 * 1000);
    }

    animate();
    setInterval(animate, pace * 4 * 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showCompletionPage() {
    app.innerHTML = `
        <div class="completion-panel">
            <h2>Good job!</h2>
            <p>You treated yourself well today! Don’t forget to come back tomorrow.</p>
            <div class="completion-buttons">
                <button id="repeat-btn">Repeat with same settings</button>
                <button id="main-menu-btn">Return to main menu</button>
            </div>
        </div>
    `;

    const repeatBtn = document.getElementById('repeat-btn');
    repeatBtn.addEventListener('click', showBreathingPage);

    const mainMenuBtn = document.getElementById('main-menu-btn');
    mainMenuBtn.addEventListener('click', showLandingPage);
}

showLandingPage();