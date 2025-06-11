document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;
    const darkThemeLink = document.getElementById('dark-theme-style'); // 我们将在 head.html 中为此 link 设置 id

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode-active'); // 你可以根据 dark.css 是否需要这个类来决定
            if (darkThemeLink) {
                darkThemeLink.removeAttribute('disabled');
            }
            if (themeToggleButton) {
                themeToggleButton.innerHTML = '<i class="fas fa-sun"></i> Light mode';
            }
        } else {
            body.classList.remove('dark-mode-active');
            if (darkThemeLink) {
                darkThemeLink.setAttribute('disabled', 'true');
            }
            if (themeToggleButton) {
                themeToggleButton.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
            }
        }
    }

    // 页面加载时应用保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light'; // 默认为亮色
    applyTheme(savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function () {
            let currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme === 'light') {
                localStorage.setItem('theme', 'dark');
                applyTheme('dark');
            } else {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            }
        });
    }
});