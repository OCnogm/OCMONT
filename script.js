let isDragging = false;
let offsetX, offsetY;

// Загружаем состояние приложений из localStorage
function loadAppState() {
    const apps = ['calculator', 'youtube', 'gmail', 'google-translate', 'torrent-game'];
    apps.forEach(app => {
        const status = localStorage.getItem(`${app}-status`);
        const menuElement = document.getElementById(`${app}-menu`);
        const statusElement = document.getElementById(`${app}-status`);

        if (status === 'Installed') {
            statusElement.innerText = 'Installed';
            statusElement.style.color = 'green'; // Изменяем цвет статуса на зелёный
            menuElement.style.display = 'block'; // Отображаем кнопку приложения в меню
        }
    });
}

// Открытие приложения
function openApp(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = 'block';
    appWindow.style.left = '50px'; // Устанавливаем начальную позицию
    appWindow.style.top = '50px'; // Устанавливаем начальную позицию
}

// Закрытие приложения
function closeApp(appId) {
    document.getElementById(appId).style.display = 'none';
}

// Установка приложения
function installApp(appName) {
    const statusElement = document.getElementById(`${appName}-status`);
    const menuElement = document.getElementById(`${appName}-menu`);

    // Проверяем, установлено ли приложение
    if (statusElement.innerText === 'Installed') {
        alert(`${appName.charAt(0).toUpperCase() + appName.slice(1)} is already installed.`);
        return;
    }

    // Устанавливаем приложение
    statusElement.innerText = 'Installed';
    statusElement.style.color = 'green'; // Изменяем цвет статуса на зелёный
    alert(`${appName.charAt(0).toUpperCase() + appName.slice(1)} has been installed!`);

    // Отображаем кнопку приложения в меню
    menuElement.style.display = 'block';

    // Сохраняем состояние в localStorage
    localStorage.setItem(`${appName}-status`, 'Installed');
}

// Добавление символа в дисплей калькулятора
function addToCalcDisplay(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

// Вычисление результата
function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// Очистка дисплея калькулятора
function clearCalcDisplay() {
    document.getElementById('calc-display').value = '';
}

// Открытие YouTube
function openYouTube() {
    window.open('https://www.youtube.com', '_blank');
}

// Открытие Gmail
function openGmail() {
    window.open('https://mail.google.com', '_blank'); // Открытие Gmail
}

// Открытие Google Переводчика
function openGoogleTranslate() {
    window.open('https://translate.google.com', '_blank'); // Открытие Google Translate
}

// Открытие Торрент Игры
function openTorrentGame() {
    window.open('https://itorrents-igruha.org/', '_blank'); // Открытие сайта Торрент Игра
}

// Открытие магазина приложений
function openAppStore() {
    openApp('app-store'); // Открываем магазин приложений
}

// Обновление состояния приложений
function refreshApps() {
    loadAppState();
    alert('App states refreshed!');
}

// Начало перетаскивания
function startDrag(e, appId) {
    isDragging = true;
    const appWindow = document.getElementById(appId);
    offsetX = e.clientX - appWindow.getBoundingClientRect().left;
    offsetY = e.clientY - appWindow.getBoundingClientRect().top;

    document.addEventListener('mousemove', dragApp);
    document.addEventListener('mouseup', stopDrag);
}

// Перетаскивание окна
function dragApp(e) {
    if (isDragging) {
        const appWindow = document.querySelector('.app-window[style*="display: block"]'); // Перетаскивание активного окна
        appWindow.style.left = `${e.clientX - offsetX}px`;
        appWindow.style.top = `${e.clientY - offsetY}px`;
        appWindow.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование
    }
}

// Остановка перетаскивания
function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', dragApp);
    document.removeEventListener('mouseup', stopDrag);
}

// Вызываем загрузку состояния при загрузке страницы
window.onload = loadAppState;
