import HeroSection from './sections/hero';
import GuideSection from './sections/guide';
import FeatureSection from './sections/feature';
import FAQSection from './sections/faq';
import CTASection from './sections/cta';

class Home {
  constructor() {
    this.hero = new HeroSection();
    this.guide = new GuideSection();
    this.feature = new FeatureSection();
    this.faq = new FAQSection();
    this.cta = new CTASection();
  }

  async _render() {
    const container = document.createElement('div');
    container.append(
      this.hero.render(),
      this.guide.render(),
      this.feature.render(),
      this.faq.render(),
      this.cta.render(),
    );
    return container;
  }

  _initializeEvent() {
    const getStartedBtn = document.querySelector('#cta-start');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', () => {
        window.location.hash = '/analyze';
      });
    }
    this.hero._initializeEvent();
  }
}

export default Home;
