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


var open_t2 = document.querySelector("#open_taskTwo");
var task2 = document.querySelector("#task_two");
var cl2 = document.querySelector(".claim_task2");

task2.onclick = function() {
    open_t2.style.display = "block";
}

cl2.onclick = function() {
    open_t2.style.display = "none"; // Закрываем модальное окно
}

window.onclick = function(event) {
    if (event.target == open_t2) {
        open_t2.style.display = "none"; // Закрываем модальное окно
    }
}


var open_t3 = document.querySelector("#open_taskThree");
var task3 = document.querySelector("#task_three");
var cl3 = document.querySelector(".claim_task3");

task3.onclick = function() {
    open_t3.style.display = "block";
}

cl3.onclick = function() {
    open_t3.style.display = "none"; // Закрываем модальное окно
}

window.onclick = function(event) {
    if (event.target == open_t3) {
        open_t3.style.display = "none"; // Закрываем модальное окно
    }
}

var open_t4 = document.querySelector("#open_taskFour");
var task4 = document.querySelector("#task_four");
var cl4 = document.querySelector(".claim_task4");

task4.onclick = function() {
    open_t4.style.display = "block";
}

cl4.onclick = function() {
    open_t4.style.display = "none"; // Закрываем модальное окно
}

window.onclick = function(event) {
    if (event.target == open_t4) {
        open_t4.style.display = "none"; // Закрываем модальное окно
    }
}

var open_t5 = document.querySelector("#open_taskFive");
var task5 = document.querySelector("#task_five");
var cl5 = document.querySelector(".claim_task5");

task5.onclick = function() {
    open_t5.style.display = "block";
}

cl5.onclick = function() {
    open_t5.style.display = "none"; // Закрываем модальное окно
}

window.onclick = function(event) {
    if (event.target == open_t5) {
        open_t5.style.display = "none"; // Закрываем модальное окно
    }
}
