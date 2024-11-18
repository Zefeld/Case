const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

const progressBarScore = document.getElementById('progress');

const progressBarEnergy = document.querySelector('.energy-bar'); // Ссылка на прогресс-бар энергии
const energyTextValue = document.querySelector('#energy-bar-text');

let restoreEnergyInterval; // Переменная для хранения интервала восстановления энергии

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0;
}

function addOne() {
    if (getEnergy() > 0) { // Проверяем, есть ли энергия
        let score = getScore();
        setScore(score + 1);
        decreaseEnergy();
        updateScore(score + 1)
        return true;
    }
    return false;
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

    setTimeout(() => {
        //если увеличили счет
        if (addOne()) {
            // Создаем элемент +1
            const plusOne = document.createElement('div');
            // Добавляем элемент в body
            document.body.appendChild(plusOne);
            plusOne.textContent = '+1';
            plusOne.classList.add('plusOne');
            plusOne.style.left = `${x - 20 + Math.random() * 20}px`;
            plusOne.style.top = `${y - 40}px`;
            setTimeout(() => {
                plusOne.remove();
            }, duration);
        }
    }, 10);
}

//lvl
function updateScore(newScore) {
    score = newScore;
    // Предположим, максимальное количество очков для заполнения - 5000
    const maxScore = 5000;
    //высчитываем заполненность прогресс бара на основе текущего счета, причем ограничиваем значение до 100
    let percentage = Math.min((score / maxScore) * 100,100);
    // Устанавливаем ширину фона
    progressBarScore.style.setProperty('--width', (percentage) + '%');
}


//energy
var energy = 100;

//получение энергии
function getEnergy() {
    return energy;
}

//обновление энергии и энергиБара
function setEnergy(value) {
    energy = value;
    updateEnergyBar(energy);
}

//обновление статуса энергии на экране
function updateEnergyBar(value) {
    progressBarEnergy.style.setProperty('--width2', (value) + '%');
    energyTextValue.textContent = value;
}

// Функция уменьшения энергии
function decreaseEnergy() {
    let newEnergy = getEnergy() - 1; // Уменьшаем на 10% при каждом клике
    if (newEnergy >= 0) {
        setEnergy(newEnergy);
    }
}

// Функция восстановления энергии
function restoreEnergy() {
    let temp = getEnergy(); //получаем значение энергии
    if (temp >= 100) return; //если текущяя энергия 100 то выходим и ничего не делаем
    let newEnergy = temp + 1; // Восстанавливаем на 1
    setEnergy(newEnergy); // Обновляем нашу энергию на 1
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

// Функция инициализации энергии
function initializeEnergy() {
    updateEnergyBar(100);
    startEnergyRestoration(); // Запускаем восстановление энергии
}

function initialize() {
    let score = parseInt(localStorage.getItem('score')) || 0;
    setScore(getScore());
    initializeEnergy(); // Инициализируем энергию при старте
    updateScore(score);
}

initialize();


// Получаем элементы модального окна и кнопки
var modal = document.getElementById("every_day_nonvisibly");
var btn = document.getElementById("every_day_tasks");
var span = document.getElementsByClassName("krest")[0];

// Открыть модальное окно при нажатии на кнопку
btn.onclick = function() {
    modal.style.display = "grid";
}

// Закрыть модальное окно при нажатии на элемент <span>
span.onclick = function() {
    modal.style.display = "none";
}

// Закрыть модальное окно при нажатии вне его содержимого
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}