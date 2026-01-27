import routes from './routes/routes';
import UrlParser from './routes/urlParser';
import Footer from './view/component/footer';
import Navbar from './view/component/navbar';

class Main {
  constructor({ content, loadingContainer, mainContentWrapper }) {
    this._content = content;
    this._loadingContainer = loadingContainer;
    this._mainContentWrapper = mainContentWrapper;

    this.InitialAppShell();
  }

  InitialAppShell() {
    this._navbar = new Navbar();

    const navbarElement = this._navbar.render();
    const footer = new Footer().render();

    if (this._mainContentWrapper && this._mainContentWrapper.parentNode) {
      this._mainContentWrapper.parentNode.insertBefore(
        navbarElement,
        this._mainContentWrapper,
      );
      this._mainContentWrapper.parentNode.appendChild(footer);
    }

    this._navbar.initialize();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const Page = routes[url];

    if (Page) {
      const page = new Page();
      this._content.innerHTML = '';
      this._content.appendChild(await page._render());
      if (typeof page._initializeEvent === 'function') {
        page._initializeEvent();
      }
    } else {
      this._content.innerHTML = '<h1>404 - Halaman Tidak Ditemukan</h1>';
    }
  }
}

export default Main;
