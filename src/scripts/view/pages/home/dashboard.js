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
        statistics: {
          positive_count: 827,
          negative_count: 559,
          neutral_count: 114,
          distribution: {
            Positive: '55%',
            Negative: '37%',
            Neutral: '8%',
          },
        },
        strategic_insights: [
          {
            urgency: 'Critical',
            topic: 'Login & Password Reset Loop Issues',
            evidence:
              'password salah setelah 3 kali salah. kemudian suruh bikin ulang, lah pas bikin ulang pdhl udh pake password yang beda-beda malah diulang ulang terus proses nya, ngga bisa terproses perbaiki sistem lu nihh',
            percentage_estimate: 11,
            recommendation:
              'Review dan optimalkan alur login dan reset password untuk mengurangi kompleksitas dan loop error. Implementasikan logging detail yang lebih granular untuk setiap kegagalan login/reset guna identifikasi pola anomali dan perbaikan cepat.',
          },
          {
            urgency: 'High',
            topic: 'Payment Gateway Timeout',
            evidence:
              'Pas mau bayar pake QRIS muter terus, eh taunya saldo kepotong tapi status di apps masih nunggu pembayaran.',
            percentage_estimate: 8,
            recommendation:
              'Sinkronisasi callback antara payment gateway dan core database. Tambahkan fitur auto-reconciliation untuk transaksi yang menggantung.',
          },
          {
            urgency: 'Medium',
            topic: 'UI/UX Layout Shifting',
            evidence:
              'Tombol checkout ketutupan keyboard pas mau isi alamat, jadi harus scroll-scroll dulu ribet.',
            percentage_estimate: 15,
            recommendation:
              'Adjust bottom padding pada form view dan implementasikan keyboard-aware-scroll-view agar input tidak terhalang.',
          },
        ],
      },
      metadata: {
        total_records: 1500,
        detected_column: 'Customer Feedback',
        processed_at: '2026-02-24 17:15:00',
      },
    };

    this.results.update(dummyData);

    // this.results.render().classList.add('d-none');
    // this.results.render().innerHTML = '';
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
