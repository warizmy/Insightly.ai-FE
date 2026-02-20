import 'lazysizes';
import '../styles/main.css';
import Main from './app';
import setActiveNavbar from './utils/navbarActive';
import ProgressBar from './utils/progressBar';

const app = new Main({
  content: document.querySelector('#mainContent'),
  loadingContainer: document.getElementById('loading-circle-container'),
  mainContentWrapper: document.querySelector('.main-content-wrapper'),
});

const progressBar = new ProgressBar();

window.addEventListener('load', async () => {
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
  progressBar.start();

  await app.renderPage();
  setActiveNavbar();

  progressBar.finish();

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker
  //     .register('/sw.js');
  // }
});

window.addEventListener('hashchange', async () => {
  progressBar.start();

  await app.renderPage();
  setActiveNavbar();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });

  progressBar.finish();
});
