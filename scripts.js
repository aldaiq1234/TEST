    
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

// Сохранение данных профиля в localStorage
function saveProfile() {
    const username = localStorage.getItem("userName");
    if (!username) return;

    const age = document.getElementById("age").value;
    const subject1 = document.getElementById("subject1").value;
    const subject2 = document.getElementById("subject2").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;

    const userProfile = {
        age,
        subject1,
        subject2,
        city,
        phone
    };

    localStorage.setItem(`profile_${username}`, JSON.stringify(userProfile));
    alert("Профиль сохранен!");
    closeProfile();
}

// Загрузка данных профиля из localStorage
function loadProfile() {
    const username = localStorage.getItem("userName");
    if (!username) return;

    const savedProfile = JSON.parse(localStorage.getItem(`profile_${username}`));
    if (savedProfile) {
        document.getElementById("age").value = savedProfile.age || "";
        document.getElementById("subject1").value = savedProfile.subject1 || "";
        document.getElementById("subject2").value = savedProfile.subject2 || "";
        document.getElementById("city").value = savedProfile.city || "";
        document.getElementById("phone").value = savedProfile.phone || "";
    }
}

// Открытие модального окна профиля и загрузка данных
function openProfile() {
    loadProfile();
    document.getElementById("profileModal").style.display = "block";
    document.body.classList.add("modal-open");
}

// Закрытие модального окна профиля
function closeProfile() {
    document.getElementById("profileModal").style.display = "none";
    document.body.classList.remove("modal-open");
}

// Логика для загрузки профиля при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("userName");
    if (username) {
        loadProfile();
    }
});
// Функция для регистрации пользователя
function registerUser() {
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessages = document.getElementById("errorMessages");

    errorMessages.textContent = ""; // Очистка предыдущих ошибок

    if (password !== confirmPassword) {
        errorMessages.textContent = "Пароли не совпадают.";
        return false;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        errorMessages.textContent = "Пользователь с таким никнеймом уже зарегистрирован.";
        return false;
    }

    users[username] = { email: email, password: password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Регистрация прошла успешно!");
    window.location.href = "login.html";
    return false;
}

// Функция для входа пользователя
function validateLogin() {
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const loginErrorMessages = document.getElementById("loginErrorMessages");

    loginErrorMessages.textContent = "";

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[nickname] && users[nickname].password === password) {
        localStorage.setItem("userName", nickname);
        window.location.href = "index.html";
    } else {
        loginErrorMessages.textContent = "Неверный никнейм или пароль.";
    }
    return false;
}

// Показ информации пользователя после входа
function showUserInfo() {
    const username = localStorage.getItem("userName");
    if (username) {
        document.getElementById("authLinks").style.display = "none";
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("userName").textContent = username;
    }
}

// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem("userName");
    document.getElementById("authLinks").style.display = "block";
    document.getElementById("userInfo").style.display = "none";
    alert("Вы вышли из аккаунта!");
    window.location.href = "index.html";
}

// Загружаем состояние при загрузке страницы
document.addEventListener("DOMContentLoaded", showUserInfo);

// Данные о предметах, преподавателях и их фото
const subjectsData = {
    math: { teacher: "Айжан А.", photo: "https://obr.so/wp-content/uploads/2022/10/banner-uchitel-istoriya-1200x900.jpg", spots: 12 },
    physics: { teacher: "Ерлан Б.", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwtjRkJQSvPaR41YzKH-1777-V8Qv1PN54g&s", spots: 14 },
    chemistry: { teacher: "Гульнар В.", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7mN8p7DMl-zkCSgs5vpa97Nt2jMgK6Wtaeg&s", spots: 14 },
    biology: { teacher: "Асем Г.", photo: "https://static.365info.kz/uploads/2021/09/6866daecb37f3c05da6ab63935740f0a-600x400.jpg", spots: 22 },
    history: { teacher: "Данияр Д.", photo: "https://tengrinews.kz/userdata/article/2024/article_2614/thumb_b/photo_3790.jpeg", spots: 16 },
    geography: { teacher: "Мадина Е.", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGMvVBfyz6bd407uhdR4DkukAsYFk_2WtRQ&s", spots: 14 },
    english: { teacher: "Анвар Ж.", photo: "https://avatars.dzeninfra.ru/get-zen_doc/3986597/pub_60ba0b3c3adb654fa5f757d6_60bb521b1b3f5c222653c9d9/scale_1200", spots: 17 }
};

// Функция для поиска доступных мест и преподавателя
function searchENTSubjects() {
    const selectedSubject = document.getElementById("subject-select").value;
    const teacherPhoto = document.getElementById("teacher-photo");
    const subjectInfo = document.getElementById("subject-info");
    const enrollButton = document.getElementById("enrollButton");

    if (!selectedSubject) {
        alert("Пожалуйста, выберите предмет.");
        return;
    }

    // Получение данных по выбранному предмету
    const subjectData = subjectsData[selectedSubject];
    const savedSpots = localStorage.getItem(`spots_${selectedSubject}`);

    // Обновление количества мест на основе сохраненных данных
    subjectData.spots = savedSpots !== null ? parseInt(savedSpots) : subjectData.spots;

    // Обновление фото преподавателя и информации о количестве мест
    teacherPhoto.innerHTML = `<img src="${subjectData.photo}" alt="Фото преподавателя">`;
    subjectInfo.innerHTML = `
        <p><strong>Преподаватель:</strong> ${subjectData.teacher}</p>
        <p><strong>Доступные места:</strong> <span id="spots">${subjectData.spots}</span></p>
    `;

    // Показать кнопку "Записаться", если есть доступные места
    enrollButton.style.display = subjectData.spots > 0 ? "block" : "none";
}

// Функция для записи студента на предмет
function enrollStudent() {
    const selectedSubject = document.getElementById("subject-select").value;
    const spotsElement = document.getElementById("spots");

    if (!selectedSubject) {
        alert("Пожалуйста, выберите предмет.");
        return;
    }

    // Получение данных по выбранному предмету
    const subjectData = subjectsData[selectedSubject];

    // Проверка, есть ли доступные места
    if (subjectData.spots > 0) {
        // Уменьшение количества мест на 1
        subjectData.spots -= 1;

        // Обновление отображения количества мест
        spotsElement.textContent = subjectData.spots;

        // Сохранение обновленного количества мест в localStorage
        localStorage.setItem(`spots_${selectedSubject}`, subjectData.spots);

        // Сообщение об успешной записи
        alert("Вы успешно записались на этот предмет!");

        // Скрыть кнопку "Записаться", если мест больше нет
        if (subjectData.spots === 0) {
            document.getElementById("enrollButton").style.display = "none";
        }
    } else {
        alert("Извините, доступных мест больше нет.");
    }
}

// Сброс сохраненных данных при необходимости (например, при загрузке страницы)
// Если вы хотите сбросить данные мест для тестирования, раскомментируйте следующую строку:
// localStorage.clear();
// Функция для переключения темы
function toggleTheme() {
    // Переключаем класс темной темы на body
    const isDarkTheme = document.body.classList.toggle("dark-theme");

    // Сохраняем текущую тему в localStorage
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
}

// Проверка сохраненной темы при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    // Если сохранена темная тема, то применяем её
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
});

