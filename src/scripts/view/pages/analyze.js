import Popup from '../../utils/popUp';
import ResultsSection from '../component/results';
import UploadsSection from '../component/uploads';

class Analyze {
  constructor() {
    this.uploads = new UploadsSection();
    this.results = new ResultsSection();
    this.popup = new Popup();
    this._isDirty = false;
  }

  async _render() {
    const container = document.createElement('div');
    container.className = 'analyze-page container-fluid mt-5';
    container.append(
      this.uploads._render(),
      this.results.render(),
    );
    return container;
  }

  _initializeEvent() {
    this.uploads._initializeEvent({
      onSuccess: (data) => this._handleAnalysisSuccess(data),
      onError: (err) => console.error('Upload error:', err),
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

          const confirm = await this.popup.show(
            'Analysis data will be lost if you leave. Continue?',
            true,
          );

          if (confirm) {
            this._isDirty = false;
            window.location.href = targetUrl;
          }
        }
      });
    });
  }

  _handleAnalysisSuccess(data) {
    this._isDirty = true;
    this.results.update(data);

    setTimeout(() => {
      window.scrollTo({
        top: this.results.render().offsetTop - 50,
        behavior: 'smooth',
      });
    }, 100);
  }
}

export default Analyze;
