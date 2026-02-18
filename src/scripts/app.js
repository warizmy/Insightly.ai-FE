import routes from './routes/routes';
import UrlParser from './routes/urlParser';
import Footer from './view/component/footer';
import Navbar from './view/component/navbar';

class Main {
  constructor({ content, loadingContainer, mainContentWrapper }) {
    this._content = content;
    this._loadingContainer = loadingContainer;
    this._mainContentWrapper = mainContentWrapper;
    this._activePage = null;

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
    if (this._activePage && typeof this._activePage._destroy === 'function') {
      this._activePage._destroy();
    }

    const url = UrlParser.parseActiveUrlWithCombiner();
    const Page = routes[url];

    if (Page) {
      this._activePage = new Page();

      this._content.innerHTML = '';
      this._content.classList.remove('active');
      this._content.classList.add('page-transition');

      const renderedContent = await this._activePage._render();
      this._content.appendChild(renderedContent);

      requestAnimationFrame(() => {
        setTimeout(() => { this._content.classList.add('active'); }, 50);
      });

      if (typeof this._activePage._initializeEvent === 'function') {
        this._activePage._initializeEvent();
      }
    } else {
      this._content.innerHTML = '<h1 class="text-center mt-5 pt-5">404 Not Found</h1>';
    }
  }
}

export default Main;
