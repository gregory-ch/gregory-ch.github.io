# oTree CORS Setup for Embedded Experiments

This document explains how to set up Cross-Origin Resource Sharing (CORS) for oTree 5+ applications on Heroku, allowing them to be embedded in iframes on other domains.

## Setup Instructions

### 1. Deploy the CORS Configuration Files

Ensure these files are included in your oTree project:

- `run.py` - Custom launcher script that adds CORS middleware to oTree
- `Procfile` - Heroku configuration file that uses the custom launcher
- `requirements.txt` - Includes necessary dependencies (uvicorn, starlette)
- `otree_communication.js` - Helper script for cross-window communication

### 2. Include the Communication Script in oTree Templates

To enable communication between your oTree application and the parent window, include the `otree_communication.js` script in your base template.

Add the following to your `_templates/global/Page.html` file or your application's base template:

```html
{{ block scripts }}
    {{ next_button_script }}
    <script src="{{ static 'global/otree_communication.js' }}"></script>
{{ endblock }}
```

### 3. Copy the Communication Script to Static Folder

Copy the `otree_communication.js` file to your oTree project's static folder:

```
your_otree_project/
├── _static/
│   └── global/
│       └── otree_communication.js  <-- Place here
```

### 4. Send Custom Data to Parent Window

In any page where you need to communicate with the parent window, you can use the `sendMessageToParent` function:

```html
{{ block scripts }}
    {{ next_button_script }}
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Access oTree data
            const playerData = {
                participantCode: "{{ participant.code }}",
                playerRole: "{{ player.role }}",
                // Add any other data you want to send
                customField: "{{ player.my_field }}"
            };
            
            // Send to parent window
            sendMessageToParent({
                type: 'playerData',
                data: playerData
            });
        });
    </script>
{{ endblock }}
```

## Troubleshooting

If you experience issues with CORS:

1. Check the Heroku logs: `heroku logs --tail`
2. Verify that all allowed origins are correctly listed in the `ALLOWED_ORIGINS` variable in `run.py`
3. Test with simple fetch requests from your domain to the oTree server
4. Make sure your browser's console isn't showing CORS errors

## Security Considerations

- Only add domains you control to the `ALLOWED_ORIGINS` list
- Be careful about what data you expose through postMessage
- Consider adding additional authentication if sensitive data is being shared 