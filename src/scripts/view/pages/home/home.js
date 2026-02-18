import HeroSection from './sections/hero';

class Home {
  async _render() {
    const container = document.createElement('div');

    container.append(
      new HeroSection().render(),
    );

    return container;
  }

  _initializeEvent() {
  }
}

export default Home;
