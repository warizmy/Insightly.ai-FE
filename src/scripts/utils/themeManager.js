class ThemeManager {
  static init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.apply(savedTheme);
  }

  static toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.apply(newTheme);
  }

  static apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Dispatch event biar komponen lain (kayak Chart.js) bisa tau tema berubah
    window.dispatchEvent(
      new CustomEvent('themeChanged', { detail: { theme } }),
    );
  }

  static isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}

export default ThemeManager;
