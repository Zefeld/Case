// Получаем элементы модального окна и кнопки
var modal = document.querySelector("#open_everyDay");
var btn = document.querySelector(".every_day_tasks");
var close = document.querySelector("#krest");

console.log(modal); // Должен быть элемент, а не null
console.log(btn); // Должен быть элемент, а не null
console.log(close);

// Открыть модальное окно при нажатии на кнопку
btn.onclick = function() {
    modal.style.display = "grid";
}

close.onclick = function() {
    modal.style.display = "none"; // Закрываем модальное окно
}


// Закрыть модальное окно при нажатии на элемент <span>

// Закрыть модальное окно при нажатии вне его содержимого
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Закрываем модальное окно
    }
}