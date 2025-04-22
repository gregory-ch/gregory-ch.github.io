// Глобальный объект otreeApp, доступный из HTML
var otreeApp = {};

// Приватные переменные
var sessionUrl = '';

// REST API ключ для oTree (закодирован в Base64)
var _restEncoded = 'ZG9mdmlmam5fMm4yOTEybW5tIQ==';  // Base64
// Декодируем ключ при выполнении
var OTREE_REST = atob(_restEncoded);

// Функция для установки статуса
function setStatus(message, loading) {
    var statusElement = document.getElementById('status-message');
    if (!statusElement) return;
    
    if (loading) {
        statusElement.innerHTML = message + ' <span class="spinner"></span>';
    } else {
        statusElement.textContent = message;
    }
}

// Функция для отображения ошибки
function showError(message) {
    var errorElement = document.getElementById('error-message');
    if (!errorElement) return;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    setStatus('Failed to generate link', false);
}

// Функция для отображения результата
function showResult(link) {
    var resultContainer = document.getElementById('result-container');
    var resultLink = document.getElementById('result-link');
    if (!resultContainer || !resultLink) return;
    
    sessionUrl = link;
    resultLink.href = link;
    resultLink.textContent = link;
    resultContainer.style.display = 'block';
    
    setStatus('Session link successfully generated!', false);
}

// Функция для поиска ссылки в HTML
function findLinkInHtml(html) {
    console.log("Got HTML response, length: " + html.length);
    console.log("HTML preview: " + html.substring(0, 200));
    
    // Попробуем найти ссылку по разным шаблонам
    var patterns = [
        /href=["']([^"']*\/room\/[^"']*)["'][^>]*>Session-wide demo link/i,
        /https:\/\/belabeu-e7061ee8ef78\.herokuapp\.com\/join\/([a-z0-9]+)/i,
        /https:\/\/belabeu-e7061ee8ef78\.herokuapp\.com\/room\/([a-z0-9]+)/i,
        /SessionStartLinks\/([a-z0-9]+)/i
    ];
    
    // Проверяем каждый шаблон
    for (var i = 0; i < patterns.length; i++) {
        var match = html.match(patterns[i]);
        if (match) {
            if (i === 0 && match[1]) { // Session-wide demo link
                console.log("Found session link (pattern " + i + "): " + match[1]);
                return match[1];
            } else if (i === 3 && match[1]) { // SessionStartLinks
                var fullLink = "https://belabeu-e7061ee8ef78.herokuapp.com/SessionStartLinks/" + match[1];
                console.log("Found session link (pattern " + i + "): " + fullLink);
                return fullLink;
            } else if (match[0]) { // join or room links
                console.log("Found session link (pattern " + i + "): " + match[0]);
                return match[0];
            }
        }
    }
    
    // Если ничего не нашли, ищем любые URL
    var urlPattern = /https:\/\/belabeu-e7061ee8ef78\.herokuapp\.com\/[a-z0-9\/\-_?=&]+/gi;
    var allUrls = html.match(urlPattern);
    
    if (allUrls && allUrls.length > 0) {
        console.log("Found URLs: ", allUrls);
        
        // Ищем наиболее подходящую ссылку
        for (var j = 0; j < allUrls.length; j++) {
            var url = allUrls[j];
            if (url.includes('/room/') || url.includes('/join/') || url.includes('SessionStartLinks')) {
                console.log("Selected most relevant URL: " + url);
                return url;
            }
        }
        
        // Если не нашли подходящую, берем первую
        console.log("Taking first URL found: " + allUrls[0]);
        return allUrls[0];
    }
    
    console.log("No links found in HTML");
    return null;
}

// Основная функция для генерации ссылки
function generateExperimentLink() {
    console.log("Generate button clicked");
    
    // Сбрасываем UI
    var errorElement = document.getElementById('error-message');
    if (errorElement) errorElement.style.display = 'none';
    
    var resultContainer = document.getElementById('result-container');
    if (resultContainer) resultContainer.style.display = 'none';
    
    // Показываем состояние загрузки
    setStatus('Connecting to oTree server...', true);
    
    // Создаем AJAX-запрос
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://belabeu-e7061ee8ef78.herokuapp.com/demo/dsst', true);
    xhr.withCredentials = false;
    
    // Обработчик ответа
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log("Received response, status: " + xhr.status);
            
            // Ищем ссылку в HTML
            var link = findLinkInHtml(xhr.responseText);
            
            if (link) {
                showResult(link);
            } else {
                showError("Could not find session link in the response.");
            }
        } else {
            showError("Server returned error: " + xhr.status);
        }
    };
    
    // Обработчик ошибки
    xhr.onerror = function() {
        console.error("Network error occurred");
        showError("Network error occurred. CORS may be blocking the request.");
    };
    
    // Отправляем запрос
    try {
        xhr.send();
        console.log("Request sent to oTree server");
    } catch (error) {
        console.error("Error sending request:", error);
        showError("Error sending request: " + error.message);
    }
}

// Функция для открытия ссылки в новом окне
function openInNewTab() {
    if (sessionUrl) {
        window.open(sessionUrl, '_blank');
    }
}

// Отправка OPTIONS-запроса для отладки CORS
function logServerOptions() {
    console.log('Sending OPTIONS request to oTree server...');
    var xhrOpts = new XMLHttpRequest();
    xhrOpts.open('OPTIONS', 'https://belabeu-e7061ee8ef78.herokuapp.com/demo/dsst', true);
    xhrOpts.withCredentials = false;
    xhrOpts.onload = function() {
        console.log('OPTIONS status:', xhrOpts.status);
        console.log('Allow header:', xhrOpts.getResponseHeader('Allow'));
        console.log('All response headers:\n', xhrOpts.getAllResponseHeaders());
    };
    xhrOpts.onerror = function() {
        console.error('OPTIONS request failed');
    };
    xhrOpts.send();
}

// Helper to read cookie by name
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

// Создать новую сессию через oTree API с REST 
function createSession() {
    console.log('Creating new oTree session via CSRF cookie...');
    var csrftoken = getCookie('csrftoken');
    fetch('https://belabeu-e7061ee8ef78.herokuapp.com/api/sessions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'otree-rest': OTREE_REST
        },
        body: JSON.stringify({
            session_config_name: 'dsst',
            num_participants: 1
        }),
        credentials: 'omit'
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Session created:', data);
        showResult(data.session_wide_url);
    })
    .catch(error => {
        console.error('Ошибка при создании сессии:', error);
        showError('Ошибка при создании сессии: ' + error.message);
    });
}

// Экспортируем функции в глобальный объект otreeApp для доступа из HTML
otreeApp.generateExperimentLink = generateExperimentLink;
otreeApp.openInNewTab = openInNewTab;
otreeApp.logServerOptions = logServerOptions;
otreeApp.createSession = createSession;

// Инициализация при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    console.log("oTree experiment script loaded at " + new Date().toISOString());
    console.log("otreeApp functions defined:", 
                "generateExperimentLink =", typeof otreeApp.generateExperimentLink, 
                "openInNewTab =", typeof otreeApp.openInNewTab,
                "logServerOptions =", typeof otreeApp.logServerOptions,
                "createSession =", typeof otreeApp.createSession);
}); 