import HeroSection from './sections/hero';
import UploadsSection from './sections/uploads';

class Dashboard {
  constructor() {
    this.heroSection = new HeroSection();
    this.uploadsSection = new UploadsSection();
  }

  async _render() {
    const container = document.createElement('div');

    container.append(
      this.heroSection.render(),
      this.uploadsSection.render(),
    );

    return container;
  }

  _initializeEvent() {
    this.heroSection._initializeEvent();
  }
}

export default Dashboard;
