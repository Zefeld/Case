const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

function start() {
    setScore(getScore());
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0;
}

function addOne() {
    setScore(getScore() + 1);
}

$circle.addEventListener('click', (event) => {
    const rect = event.target.getBoundingClientRect();

    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const DEG = 20;
    const tiltX = (offsetY / (rect.height / 2)) * -DEG; // Изменено
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

    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000)
})

start();

let score = parseInt(localStorage.getItem('score')) || 0; // Получаем значение из localStorage или 0, если его нет
const scoreElement = document.getElementById('score');
const progressBarBackground = document.querySelector('.pr_bar .bg');

function updateScore(newScore) {
    score = newScore;

    // Предположим, максимальное количество очков для заполнения - 100
    const maxScore = 100000;
    let percentage = (score / maxScore) * 100;

    // Устанавливаем ширину фона
    progressBarBackground.style.width = percentage + '%';

    // Обновляем отображение счета
    scoreElement.textContent = score;

    // Если процент достиг 100, сбрасываем ширину прогресс-бара
    if (percentage > 100) {
        progressBarBackground.style.width = '0%'; // Сбрасываем ширину прогресс-бара
    }
    // Сохраняем текущее значение score в localStorage
    localStorage.setItem('score', score);
}

// Инициализируем прогресс-бар при загрузке страницы
updateScore(score);


// Пример увеличения счета
document.getElementById('circle').addEventListener('click', () => {
    updateScore(score + 1); // увеличиваем счет на 1 при клике
});

