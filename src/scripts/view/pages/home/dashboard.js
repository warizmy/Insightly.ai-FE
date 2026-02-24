import HeroSection from './sections/hero';
import UploadsSection from './sections/uploads';
import ResultsSection from './sections/results';

class Dashboard {
  constructor() {
    this.hero = new HeroSection();
    this.uploads = new UploadsSection();
    this.results = new ResultsSection();
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
    const dummyData = {
      results: {
        statistics: { positive_count: 827, negative_count: 559, neutral_count: 114 },
        strategic_insights: [
          {
            urgency: 'CRITICAL',
            topic: 'Authentication & Login',
            evidence: 'Password salah terus padahal udah ganti berkali-kali.',
            recommendation: 'Audit OTP gateway dan session timeout.',
          },
          {
            urgency: 'MEDIUM',
            topic: 'UI/UX Mobile',
            evidence: 'Tombol checkout ketutupan keyboard.',
            recommendation: 'Adjust padding bottom pada view checkout.',
          },
        ],
      },
      metadata: { total_records: 1500, detected_column: 'Customer Feedback' },
    };

    // Langsung munculin result pas page load
    this.results.update(dummyData);
  // ---------------------------------------
  }

  _handleAnalysisSuccess(data) {
    this.results.update(data);

    window.scrollTo({
      top: this.results.render().offsetTop - 100,
      behavior: 'smooth',
    });
  }
}

export default Dashboard;
