import HeroSection from './sections/hero';
import UploadsSection from './sections/uploads';
import ResultsSection from './sections/results';

class Dashboard {
  constructor() {
    this.heroSection = new HeroSection();
    this.uploadsSection = new UploadsSection();
    this.resultsSection = new ResultsSection();
  }

  async _render() {
    const container = document.createElement('div');

    container.append(
      this.heroSection.render(),
      this.uploadsSection.render(),
      this.resultsSection._render(),
    );

    return container;
  }

  _initializeEvent() {
    this.heroSection._initializeEvent();
  }
}

export default Dashboard;
