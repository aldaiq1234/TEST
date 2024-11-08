
// Валидация формы регистрации
function validateForm(event) {
    event.preventDefault(); // Останавливаем отправку формы, если есть ошибки

    // Очистка предыдущих сообщений об ошибках
    const errorMessages = document.getElementById('errorMessages');
    if (errorMessages) errorMessages.innerHTML = '';

    // Получаем значения формы
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    // Валидация Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errorMessages.innerHTML += '<p>Электронная почта обязательна.</p>';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        errorMessages.innerHTML += '<p>Введите корректный адрес электронной почты.</p>';
        isValid = false;
    }

    // Валидация пароля
    if (password.length < 6) {
        errorMessages.innerHTML += '<p>Пароль должен содержать минимум 6 символов.</p>';
        isValid = false;
    }

    // Подтверждение пароля
    if (password !== confirmPassword) {
        errorMessages.innerHTML += '<p>Пароли не совпадают.</p>';
        isValid = false;
    }

    // Если форма не прошла валидацию, фокус на первое неправильное поле
    if (!isValid) {
        const firstInvalid = document.querySelector('input:invalid');
        if (firstInvalid) firstInvalid.focus();
    } else {
        alert('Регистрация прошла успешно!');
        event.target.submit();
    }
}

// Функция для отображения текущей даты и времени
function displayCurrentDateTime() {
    const dateTimeElement = document.getElementById("currentDateTime");
    if (dateTimeElement) {
        setInterval(() => {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };
            dateTimeElement.textContent = now.toLocaleDateString("ru-RU", options);
        }, 1000);
    }
}

// Обработка формы для добавления нового отзыва
function handleReviewForm() {
    const reviewForm = document.getElementById("reviewForm");
    const testimonialsContainer = document.querySelector(".testimonial-cards");

    if (reviewForm && testimonialsContainer) {
        reviewForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Останавливаем отправку формы

            // Получаем значения из формы
            const reviewerName = document.getElementById("reviewerName").value.trim();
            const reviewText = document.getElementById("reviewText").value.trim();

            if (reviewerName && reviewText) {
                // Показываем уведомление об успешной отправке
                alert("Спасибо за ваш отзыв!");

                // Создаем новый элемент отзыва
                const newTestimonial = document.createElement("div");
                newTestimonial.classList.add("testimonial");
                newTestimonial.innerHTML = `
                    <i class="fas fa-user-circle user-icon"></i>
                    <p>"${reviewText}"</p>
                    <span>— ${reviewerName}</span>
                `;

                // Добавляем новый отзыв в начало списка отзывов
                testimonialsContainer.prepend(newTestimonial);

                // Очищаем форму после добавления отзыва
                reviewForm.reset();
            }
        });
    } else {
        console.error("Форма или контейнер для отзывов не найдены.");
    }
}

// Выполнение кода после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const submitSound = document.getElementById("submitSound"); // Получаем аудио элемент

    reviewForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Останавливаем отправку формы

        // Получаем значения из формы
        const reviewerName = document.getElementById("reviewerName").value.trim();
        const reviewText = document.getElementById("reviewText").value.trim();

        if (reviewerName && reviewText) {
            
            submitSound.play();

            setTimeout(() => {
                alert("Спасибо за ваш отзыв!");
            }, 200); 

            // Очищаем форму после отправки
            reviewForm.reset();
        }
    });
});
// Сохранение данных пользователя в localStorage
function saveUserData(username, role, interest) {
    const users = JSON.parse(localStorage.getItem("users")) || {}; // Загружаем текущие данные
    users[username] = { role, interest }; // Добавляем или обновляем данные пользователя
    localStorage.setItem("users", JSON.stringify(users)); // Сохраняем обратно в localStorage
}

// Загрузка данных пользователя из localStorage
function loadUserData() {
    const username = localStorage.getItem("userName");
    const users = JSON.parse(localStorage.getItem("users")) || {}; // Загружаем всех пользователей

    if (username && users[username]) {
        const userData = users[username]; // Данные текущего пользователя
        document.getElementById("userName").textContent = username;
        document.getElementById("authLinks").style.display = "none";
        document.getElementById("userInfo").style.display = "block";

        // Отображаем сохраненные данные о роли и интересах
        if (userData.role && userData.interest) {
            document.querySelector(".user-role").textContent = `Роль: ${userData.role}`;
            document.querySelector(".user-interest").textContent = `Интерес: ${userData.interest}`;
        }
    }
}

// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem("userName"); // Удаляем текущего пользователя
    document.getElementById("authLinks").style.display = "block";
    document.getElementById("userInfo").style.display = "none";
    alert("Вы вышли из аккаунта!");
}

// Применение фильтров и сохранение данных
function applyFilters() {
    const username = localStorage.getItem("userName");
    const role = document.getElementById("user-role").value;
    const interest = document.getElementById("interest").value;

    if (username && role && interest) {
        saveUserData(username, role, interest); // Сохраняем данные для пользователя
        alert("Ваши данные сохранены!");
        loadUserData(); // Обновляем интерфейс
    } else {
        alert("Пожалуйста, выберите все поля.");
    }
}

// Загружаем данные при загрузке страницы
document.addEventListener("DOMContentLoaded", loadUserData);

