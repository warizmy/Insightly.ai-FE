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
              <a class="nav-link" href="#/howitworks">How it Works</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/apidocs">API Docs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/about">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
    return header;
  }

  _initializeEvent() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target) && navbarCollapse.classList.contains('active')) {
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
  }

  initialize() {
    this._initializeEvent();
  }
}

export default Navbar;
