---
layout: single
title: "Experiment"
permalink: /experiment/
author_profile: true
---

<style>
.experiment-container {
    text-align: center;
    padding: 20px;
}

.btn--primary {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.loader {
    display: none;
    margin: 20px auto;
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error {
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
}

.debug-info {
    margin-top: 20px;
    text-align: left;
    padding: 10px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
}
</style>

<div class="experiment-container">
    <button id="createSession" class="btn btn--primary">Create New Session</button>
    <div id="loader" class="loader"></div>
    <div id="result" style="margin-top: 20px;"></div>
    <div id="debug" class="debug-info" style="display: none;"></div>
</div>

<script>
document.getElementById('createSession').addEventListener('click', async function() {
    const button = this;
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    const debug = document.getElementById('debug');
    
    button.disabled = true;
    loader.style.display = 'block';
    result.innerHTML = '';
    debug.style.display = 'none';

    const api_url = "https://belabeu-e7061ee8ef78.herokuapp.com/api/sessions/";
    const api_key = "125exp125exp";

    const session_data = {
        "session_config_name": "dsst",
        "num_participants": 4,
        "room_name": "live_demo"
    };

    try {
        debug.innerHTML = `Attempting to connect to: ${api_url}<br>`;
        debug.style.display = 'block';

        // Сначала проверим доступность сервера
        try {
            const pingResponse = await fetch(api_url, {
                method: 'OPTIONS',
                mode: 'cors'
            });
            debug.innerHTML += `Server ping status: ${pingResponse.status}<br>`;
        } catch (pingError) {
            debug.innerHTML += `Server ping failed: ${pingError.message}<br>`;
        }

        // Основной запрос
        const response = await fetch('/.netlify/functions/create-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session_data)
        });

        debug.innerHTML += `Response status: ${response.status} ${response.statusText}<br>`;
        
        // Проверим заголовки CORS
        const corsHeaders = {
            'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
            'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
            'access-control-allow-headers': response.headers.get('access-control-allow-headers')
        };
        debug.innerHTML += `CORS headers: ${JSON.stringify(corsHeaders, null, 2)}<br>`;

        const data = await response.json();
        debug.innerHTML += `Response data: ${JSON.stringify(data, null, 2)}<br>`;
        
        if (response.ok) {
            if (data.session_wide_url) {
                result.innerHTML = `Success! Redirecting to: ${data.session_wide_url}`;
                setTimeout(() => {
                    window.location.href = data.session_wide_url;
                }, 1000);
            } else {
                result.innerHTML = 'Session created, but no URL provided';
            }
        } else {
            result.innerHTML = `<div class="error">Error: ${data.message || response.statusText}</div>`;
        }
    } catch (error) {
        result.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        debug.innerHTML += `Error details: ${error.stack || error}<br>`;
        debug.innerHTML += `Error name: ${error.name}<br>`;
        debug.innerHTML += `Error message: ${error.message}<br>`;
        
        // Проверим, доступен ли сервер через fetch без параметров
        try {
            const testResponse = await fetch(api_url);
            debug.innerHTML += `Basic fetch test status: ${testResponse.status}<br>`;
        } catch (testError) {
            debug.innerHTML += `Basic fetch test failed: ${testError.message}<br>`;
        }
    } finally {
        button.disabled = false;
        loader.style.display = 'none';
    }
});
</script> 