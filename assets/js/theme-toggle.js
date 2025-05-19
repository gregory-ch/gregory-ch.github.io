// Theme toggle icon setter
function setThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.innerHTML = isDark
      // Moon icon (dark mode)
    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" fill="var(--accent-color-dark, #2abc89)"></path>
        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" fill="var(--accent-color-dark, #2abc89)"></path>
        <path d="M19 11h2m-1 -1v2" stroke="var(--accent-color-dark, #2abc89)" stroke-width="1.5"></path>
        </svg>
        `
      // Sun icon (light mode)#2abc89
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="var(--accent-color, #c0392b)"/><g stroke="var(--accent-color, #c0392b)" stroke-width="2"><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5" y2="5"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg>`;
  }
  
  // Update theme for the whole site
  function updateTheme(isDark) {
    // Set data-theme on <html>
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.setProperty('--accent-color', '#c0392b');
    document.documentElement.style.setProperty('--accent-color-dark', '#2abc89');
    setThemeIcon(isDark);
    // Save user choice
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      // Remove 'hidden' class if it was added
      btn.classList.remove('hidden');
      // Set initial theme based on localStorage or system preference
      const isDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      updateTheme(isDark);
  
      btn.onclick = function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        updateTheme(!isDark);
      };
    }
  });
  