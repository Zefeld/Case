const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const progressBarEnergy = document.querySelector('.pr_bar_energy'); // Ссылка на прогресс-бар энергии
let restoreEnergyInterval; // Переменная для хранения интервала восстановления энергии

function start() {
    setScore(getScore());
    initializeEnergy(); // Инициализируем энергию при старте
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0;
}

function addOne() {
    if (parseFloat(progressBarEnergy.style.width) > 0) { // Проверяем, есть ли энергия
        setScore(getScore() + 1);
    }
}

$circle.addEventListener('click', (event) => {
    const rect = event.target.getBoundingClientRect();

    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const DEG = 20;
    const tiltX = (offsetY / (rect.height / 2)) * -DEG;
    const tiltY = (offsetX / (rect.width / 2)) * DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);
    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 300)

    const plusOne = document.createElement('div');
    plusOne.classList.add('plusOne');
    plusOne.textContent = '+1';
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;

    $circle.parentElement.appendChild(plusOne);

    // Уменьшаем энергию при клике
    decreaseEnergy();

    // Увеличиваем счет, если есть энергия
    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000)
})

start();
//lvl
let score = parseInt(localStorage.getItem('score')) || 0;
const scoreElement = document.getElementById('score');
const progressBarBackground = document.querySelector('.pr_bar .bg');

function updateScore(newScore) {
    score = newScore;
    const maxScore = 100000;
    let percentage = (score / maxScore) * 100;

    progressBarBackground.style.width = percentage + '%';
    scoreElement.textContent = score;

    if (percentage > 100) {
        progressBarBackground.style.width = '0%';
    }
    localStorage.setItem('score', score);
}

// Инициализируем прогресс-бар при загрузке страницы
updateScore(score);

// Функция инициализации энергии
function initializeEnergy() {
    progressBarEnergy.style.width = '100%'; // Устанавливаем начальное значение энергии на 100%
    startEnergyRestoration(); // Запускаем восстановление энергии
}

//energy
// Функция уменьшения энергии
function decreaseEnergy() {
    let currentEnergy = parseFloat(progressBarEnergy.style.width) || 100;
    let newEnergy = currentEnergy - 1; // Уменьшаем на 10% при каждом клике
    if (progressBarEnergy.style.width != '0%') {
        progressBarEnergy.style.width = newEnergy + '%';
    }
    console.log(typeof(progressBarEnergy.style.width))
}

// Функция восстановления энергии
function restoreEnergy() {
    let currentEnergy = parseFloat(progressBarEnergy.style.width) || 0;
    if (currentEnergy < 100) {
        let newEnergy = currentEnergy + 1; // Восстанавливаем на 10%
        if (newEnergy > 100) {
            newEnergy = 100; // newEnergy = 100; // Ограничиваем восстановление до 100%
        }
        progressBarEnergy.style.width = newEnergy + '%';
    }
}

// Функция запуска восстановления энергии
function startEnergyRestoration() {
    if (!restoreEnergyInterval) {
        restoreEnergyInterval = setInterval(() => {
            restoreEnergy();
        }, 2000); // Восстанавливаем каждые 20 секунд
    }
}

// Функция остановки восстановления энергии
function stopEnergyRestoration() {
    clearInterval(restoreEnergyInterval);
    restoreEnergyInterval = null; // Сбрасываем переменную интервала
}

// Восстанавливаем энергию через 2 минуты, если она не полная
setTimeout(() => {
    startEnergyRestoration();
}, 120); // 120000 миллисекунд = 2 минуты