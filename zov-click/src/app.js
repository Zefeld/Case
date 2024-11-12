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

    const DEG = 10;
    const tiltX = (offsetY / (rect.height / 2)) * -DEG; // Изменено
    const tiltY = (offsetX / (rect.width / 2)) * DEG;

    console.log(tiltX, tiltY);


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
