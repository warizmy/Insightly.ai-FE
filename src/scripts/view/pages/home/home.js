import HeroSection from './sections/hero';
import GuideSection from './sections/guide';
import FeatureSection from './sections/feature';

class Home {
  constructor() {
    this.hero = new HeroSection();
    this.guide = new GuideSection();
    this.feature = new FeatureSection();
  }

  async _render() {
    const container = document.createElement('div');
    container.append(
      this.hero.render(),
      this.guide.render(),
      this.feature.render(),
    );
    return container;
  }

  _initializeEvent() {
    this.hero._initializeEvent();

    const getStartedBtn = document.querySelector('#cta-start');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', () => {
        window.location.hash = '/analyze';
      });
    }
  }
}

export default Home;
