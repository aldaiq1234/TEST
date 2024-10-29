// JavaScript Form Validation
function validateForm(event) {
    event.preventDefault(); // Prevent form submission on error

    // Clear previous error messages
    const errorMessages = document.getElementById('errorMessages');
    if (errorMessages) {
        errorMessages.innerHTML = '';
    }

    // Get form values
    const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
    const password = document.getElementById('password') ? document.getElementById('password').value : '';
    const confirmPassword = document.getElementById('confirmPassword') ? document.getElementById('confirmPassword').value : '';

    let isValid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        if (errorMessages) errorMessages.innerHTML += '<p>Электронная почта обязательна.</p>';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        if (errorMessages) errorMessages.innerHTML += '<p>Введите корректный адрес электронной почты.</p>';
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        if (errorMessages) errorMessages.innerHTML += '<p>Пароль должен содержать минимум 6 символов.</p>';
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        if (errorMessages) errorMessages.innerHTML += '<p>Пароли не совпадают.</p>';
        isValid = false;
    }

    if (!isValid) {
        const firstInvalid = document.querySelector('input:invalid');
        if (firstInvalid) firstInvalid.focus();
    } else {
        alert('Регистрация прошла успешно!');
        event.target.submit();
    }
}

function changeBackgroundColor() {
    const colors = ['#AF6A6A', '#FFFFFF', '#33FF57', '#3FBCC0', '#FF33A6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Attach form validation
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', validateForm);
}

function displayCurrentDateTime() {
    const dateTimeElement = document.getElementById("currentDateTime");
    const now = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };


    const formattedDateTime = now.toLocaleDateString('ru-ru', options);

    if (dateTimeElement) {
        dateTimeElement.textContent = formattedDateTime;
    }
}

// функцию вызывает сразу
displayCurrentDateTime();

// время обновляется каждую секунду
setInterval(displayCurrentDateTime, 1000);

document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.classList.toggle('collapse');
    });
});

// Звук при наведении на звезды
const hoverSound = document.getElementById('hoverSound');
const stars = document.querySelectorAll('.star');

if (hoverSound) {
    stars.forEach((star) => {
        star.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        star.addEventListener('click', () => {
            stars.forEach((s) => s.classList.remove('selected'));
            star.classList.add('selected');
            alert(`Вы поставили ${star.dataset.value} звезд!`);
        });
    });
}

// Перетаскать из карусели на ДРОП ИМД
const carouselImages = document.querySelectorAll('.carousel-image');
const dropArea = document.getElementById('drop-area');

if (carouselImages && dropArea) {
    carouselImages.forEach((img) => {
        img.setAttribute('draggable', true);
        img.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.src);
        });
    });

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.classList.add('highlight');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('highlight');
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('highlight');

        const imageURL = event.dataTransfer.getData('text/plain');
        if (imageURL) {
            const img = document.createElement('img');
            img.src = imageURL;
            img.classList.add('dropped-image');
            dropArea.appendChild(img);
        }
    });
}
// Валидация Функция - Джони
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';

    if (password !== confirmPassword) {
        errorMessages.textContent = 'Пароли не совпадают!';
        return false;
    }
    alert("Зарегистрировано успешно!");
    return true;
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    alert("Вход выполнен успешно!");
    window.location.href = "index.html";
});
