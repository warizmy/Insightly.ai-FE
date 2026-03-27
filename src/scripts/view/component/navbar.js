import ThemeManager from '../../utils/themeManager';

class Navbar {
  render() {
    const header = document.createElement('header');
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <a href="#/" class="d-flex align-items-center justify-content-center gap-3" style="text-decoration: none;">
          <div class="navbar-txt-header">
              <div id="navbarBrand" class="navbar-brand d-flex flex-row fs-4 fw-semibold main-gradient-text">
                <i class="bi bi-cpu-fill me-2"></i>Insightly.ai
              </div>
          </div>
        </a>
        <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/analyze">Analyze</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/apidocs">API Docs</a>
            </li>
          </ul>
        </div>
      </div>
      <button id="theme-toggle" class="btn btn-link nav-link px-4 shadow-none">
        <i class="bi bi-moon-stars-fill" id="theme-icon"></i>
      </button>
    </nav>`;
    return header;
  }

  _initializeEvent() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleBtn = document.querySelector('#theme-toggle');
    const icon = document.querySelector('#theme-icon');

    document.addEventListener('click', (event) => {
      if (
        !navbar.contains(event.target)
        && navbarCollapse.classList.contains('active')
      ) {
        navbarCollapse.classList.remove('active');
      }
    });

    navbarToggler.addEventListener('click', (event) => {
      navbarCollapse.classList.toggle('active');
      event.stopPropagation();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbarCollapse.classList.remove('active');
      });
    });

    window.addEventListener('hashchange', () => {
      navbarCollapse.classList.remove('active');
    });

    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      icon.className = isDark
        ? 'bi bi-sun-fill text-warning'
        : 'bi bi-moon-stars-fill';
    };

    toggleBtn.addEventListener('click', () => {
      ThemeManager.toggle();
      updateIcon();
    });

    updateIcon();
  }

  initialize() {
    this._initializeEvent();
  }
}

export default Navbar;
