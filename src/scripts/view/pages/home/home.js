import HeroSection from './sections/hero';
import UploadsSection from './sections/uploads';

class Home {
  async _render() {
    const container = document.createElement('div');

    container.append(
      new HeroSection().render(),
      new UploadsSection().render(),
    );

    return container;
  }

  _initializeEvent() {
  }
}

export default Home;
