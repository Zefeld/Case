// Получаем элементы модального окна и кнопки
var modal = document.querySelector("#open_everyDay");
var btn = document.querySelector(".every_day_tasks");
var close = document.querySelector("#krest");
var close2 = document.querySelector("#claim");

// Открыть модальное окно при нажатии на кнопку
btn.onclick = function() {
    modal.style.display = "grid";
}

close.onclick = function() {
    modal.style.display = "none"; // Закрываем модальное окно
}

close2.onclick = function() {
    modal.style.display = "none"; // Закрываем модальное окно
}

// Закрыть модальное окно при нажатии на элемент <span>

// Закрыть модальное окно при нажатии вне его содержимого
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Закрываем модальное окно
    }
}


var open_t1 = document.querySelector("#open_taskOne");
var task1 = document.querySelector("#task_one");
var cl1 = document.querySelector(".claim_task");

task1.onclick = function() {
    open_t1.style.display = "block";
}

cl1.onclick = function() {
    open_t1.style.display = "none"; // Закрываем модальное окно
}

window.onclick = function(event) {
    if (event.target == open_t1) {
        open_t1.style.display = "none"; // Закрываем модальное окно
    }
}