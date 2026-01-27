import 'aos/dist/aos.css';
import 'lazysizes';
import 'quill/dist/quill.snow.css';
import '../styles/main.css';
import Main from './app';
import LoadingCircle from './utils/loading';
import setActiveNavbar from './utils/navbarActive';

const app = new Main({
  content: document.querySelector('#mainContent'),
  loadingContainer: document.getElementById('loading-circle-container'),
  mainContentWrapper: document.querySelector('.main-content-wrapper'),
});

const loadingBar = new LoadingCircle();

window.addEventListener('load', async () => {
  if (!window.location.hash) {
    window.location.hash = '#/';
  }

  loadingBar.show();

  await app.renderPage();
  setActiveNavbar();
  loadingBar.hide();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js');
  }
});

window.addEventListener('hashchange', async () => {
  loadingBar.show();

  await app.renderPage();
  setActiveNavbar();
  window.scrollTo(0, 0);

  loadingBar.hide();
});
