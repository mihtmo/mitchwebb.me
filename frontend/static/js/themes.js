// Available Themes
const themes = ['light', 'dark', 'forest'];

function nextTheme() {
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');

    // Get index in array, add one, get next theme
    let themeIndex = themes.indexOf(currentTheme);
    if (themeIndex === themes.length - 1) {
        themeIndex = 0;
    } else {
        themeIndex++;
    }
    const newTheme = themes[themeIndex];

    // Set theme
    document.documentElement.setAttribute('data-theme', newTheme);
}
