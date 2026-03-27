import ThemeManager from '../../utils/themeManager';

class Navbar {
  render() {
    const header = document.createElement('header');
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg shadow-sm border-bottom">
      <div class="container-fluid px-lg-5"> 
        <a href="#/" class="d-flex align-items-center" style="text-decoration: none;">
          <div id="navbarBrand" class="navbar-brand d-flex flex-row fs-4 fw-bold main-gradient-text">
            <i class="bi bi-cpu-fill me-2"></i>Insightly.ai
          </div>
        </a>
        <button class="navbar-toggler border-0 shadow-none" type="button" id="hamburger-menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center"> 
            <li class="nav-item">
              <a class="nav-link px-3" href="#/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3" href="#/analyze">Analyze</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3" href="#/apidocs">API Docs</a>
            </li>
            <li class="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button id="theme-toggle" class="btn theme-btn-circle">
                <i class="bi bi-moon-stars-fill" id="theme-icon"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
    return header;
  }

  _initializeEvent() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('#hamburger-menu');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleBtn = document.querySelector('#theme-toggle');
    const icon = document.querySelector('#theme-icon');

    navbarToggler.addEventListener('click', (event) => {
      navbarCollapse.classList.toggle('active');
      event.stopPropagation();
    });

    // Close when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInside = navbar.contains(event.target);
      if (!isClickInside && navbarCollapse.classList.contains('active')) {
        navbarCollapse.classList.remove('active');
      }
    });

    // Close when link clicked or route changed
    const closeMenu = () => navbarCollapse.classList.remove('active');

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('hashchange', closeMenu);

    // Theme Logic
    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      icon.className = isDark
        ? 'bi bi-sun-fill text-warning'
        : 'bi bi-moon-stars-fill';
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Biar gak trigger close menu pas klik toggle
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
