import HeroSection from './sections/hero';
import UploadsSection from './sections/uploads';
import ResultsSection from './sections/results';
import Popup from '../../../utils/popUp';

class Dashboard {
  constructor() {
    this.hero = new HeroSection();
    this.uploads = new UploadsSection();
    this.results = new ResultsSection();
    this.popup = new Popup();
    this._isDirty = false;
  }

  async _render() {
    const container = document.createElement('div');
    container.append(
      this.hero.render(),
      this.uploads.render(),
      this.results.render(),
    );
    return container;
  }

  _initializeEvent() {
    this.hero._initializeEvent();

    this.uploads._initializeEvent({
      onSuccess: (data) => this._handleAnalysisSuccess(data),
    });

    window.addEventListener('beforeunload', (e) => {
      if (this._isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    });

    document.querySelectorAll('nav a, footer a, .nav-link').forEach((link) => {
      link.addEventListener('click', async (e) => {
        if (this._isDirty) {
          e.preventDefault();
          const targetUrl = link.href;

          if (
            targetUrl === window.location.href
            || targetUrl === `${window.location.href}#`
          ) {
            return;
          }

          const confirm = await this.popup.show(
            'Your analysis data will be lost if you leave this page. Do you want to continue?',
            true,
          );

          if (confirm) {
            this._isDirty = false;
            this.results.render().classList.add('d-none');
            window.location.href = targetUrl;
          }
        }
      });
    });

    this._isDirty = false;
    this.results.render().classList.add('d-none');
    this.results.render().innerHTML = '';
  }

  _handleAnalysisSuccess(data) {
    this._isDirty = true; // 4. Set flag jadi TRUE pas data masuk
    this.results.update(data);

    window.scrollTo({
      top: this.results.render().offsetTop - 100,
      behavior: 'smooth',
    });
  }
}

export default Dashboard;
