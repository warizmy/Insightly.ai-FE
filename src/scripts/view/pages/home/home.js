import FaqSection from './sections/faq';
import HeroSection from './sections/hero';
import HowItWorksSection from './sections/howItWorks';

class Home {
  async _render() {
    const container = document.createElement('div');

    container.append(
      new HeroSection().render(),
      new HowItWorksSection().render(),
      new FaqSection().render(),
    );

    return container;
  }

  _initializeEvent() {
  }
}

export default Home;
