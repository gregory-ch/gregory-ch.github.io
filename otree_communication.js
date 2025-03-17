/**
 * oTree Communication Helper
 * Used to communicate with the parent window when oTree is embedded in an iframe
 */

// Function to check if we're in an iframe
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Function to send data to parent window
function sendMessageToParent(data) {
    if (isInIframe()) {
        try {
            window.parent.postMessage(data, 'https://gregory-ch.github.io');
            console.log('Message sent to parent:', data);
            return true;
        } catch (e) {
            console.error('Error sending message to parent:', e);
            return false;
        }
    }
    return false;
}

// Function to extract session code from current URL
function extractSessionCode() {
    const path = window.location.pathname;
    const match = path.match(/\/SessionStartLinks\/([a-z0-9]+)/);
    if (match) {
        return match[1];
    }
    return null;
}

// Send session code to parent if available
document.addEventListener('DOMContentLoaded', function() {
    const sessionCode = extractSessionCode();
    if (sessionCode) {
        sendMessageToParent({ sessionCode: sessionCode });
    }
    
    // Send a ready message to the parent
    sendMessageToParent({ status: 'ready', location: window.location.href });
}); 