const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const progressBarEnergy = document.querySelector('.pr_bar_energy'); // Ссылка на прогресс-бар энергии
const curEnergyElement = document.querySelector('.cur_energy');
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
        decreaseEnergy();
    }
}
function createTiltMatrix(tiltX, tiltY) {
    const radX = (tiltX * Math.PI) / 180; // Преобразуем градусы в радианы
    const radY = (tiltY * Math.PI) / 180;

    // Значения для матрицы на основе углов наклона
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    // Создаем матрицу на основе наклона по X и Y
    return [
        cosY, sinX * sinY, -sinY, 0, // Позиции для поворота вокруг Y
        0, cosX, sinX, 0,            // Позиции для поворота вокруг X
        sinY, -sinX * cosY, cosY * cosX, 0, // Позиции для Z
        0, 0, 0, 1                   // Оставляем 4x4 матрицу с идентификатором
    ].join(',');
}

const DEG = 20;
const duration = 2000;
$circle.addEventListener('click', createPlusOneEffect);
$circle.addEventListener('touchstart', createPlusOneEffect);
function createPlusOneEffect(event) {
    // Определяем координаты клика и немного рандомизируем их
    const x = (event.clientX || event.touches[0].clientX);
    const y = (event.clientY || event.touches[0].clientY);
    // Вычисляем наклон на основе координат клика относительно центра элемента
    const rect = $circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Вычисляем отклонения от центра
    const offsetX = centerX - event.clientX;
    const offsetY = centerY - event.clientY;

    const tiltX = (offsetY / (rect.height / 2)) * DEG;
    const tiltY = -(offsetX / (rect.width / 2)) * DEG;

    // Применяем матрицу 3D с параметрами наклона
    const matrix = createTiltMatrix(tiltX, tiltY);
    $circle.style.transform = `matrix3d(${matrix})`;
    // Возвращаем в исходное положение после задержки
    setTimeout(() => {
        $circle.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
    }, 300);

    // Создаем элемент +1
    const plusOne = document.createElement('div');
    plusOne.textContent = '+1';
    plusOne.classList.add('plusOne');
    plusOne.style.left = `${x - 20 + Math.random() * 20}px`;
    plusOne.style.top = `${y - 10}px`;
    // Добавляем элемент в body
    document.body.appendChild(plusOne);
    // Задержка для анимации +1
    setTimeout(() => {
        addOne(); // вызываем дополнительную функцию, если необходимо
    }, 10);

    // Удаление элемента после завершения анимации
    setTimeout(() => {
        plusOne.remove();
    }, duration);
}

start();
//lvl
let score = parseInt(localStorage.getItem('score')) || 0;
const scoreElement = document.getElementById('progress');

function updateScore(newScore) {
    score = newScore;

    // Предположим, максимальное количество очков для заполнения - 100
    const maxScore = 5000;
    let percentage = (score / maxScore) * 100;

    // Устанавливаем ширину фона
    scoreElement.style.setProperty('--width', (percentage) + '%');


    // Если процент достиг 100, сбрасываем ширину прогресс-бара
    if (percentage > 100) {
        scoreElement.style.setProperty('--width', '100%'); // Сбрасываем ширину прогресс-бара
    }
    // Сохраняем текущее значение score в localStorage
    localStorage.setItem('score', score);
}



// Инициализируем прогресс-бар при загрузке страницы
updateScore(score);

// Функция инициализации энергии
function initializeEnergy() {
    progressBarEnergy.style.width = '100%';
    curEnergyElement.textContent = '100';// Устанавливаем начальное значение энергии на 100%
    startEnergyRestoration(); // Запускаем восстановление энергии
}

//energy
// Функция уменьшения энергии
function decreaseEnergy() {
    let currentEnergy = parseFloat(progressBarEnergy.style.width) || 100;
    let newEnergy = currentEnergy - 1; // Уменьшаем на 10% при каждом клике
    if (progressBarEnergy.style.width != '0%') {
        progressBarEnergy.style.width = newEnergy + '%';
        curEnergyElement.textContent = newEnergy;
    }
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
        curEnergyElement.textContent = newEnergy;
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