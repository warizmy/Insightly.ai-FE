class FeatureSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'feature-section py-100';
    this._render();
  }

  render() {
    return this._container;
  }

  _render() {
    this._container.innerHTML = `
      <div class="container pb-5 mb-5">
        <div class="text-center mb-5 pb-1">
          <h2 class="text-center fw-bold">
            Why Insightly <span class="main-gradient-text">Stands Out</span>
          </h2>
          <p class="text-center text-muted">Our unique approach to feedback analysis sets us apart from the competition</p>
        </div>
        <div class="row align-items-center mb-5 pb-4">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="feature-graphic shadow-indigo">
              <i class="bi bi-cpu text-primary display-1"></i>
              <div class="floating-badge">IndoBERT + Gemini</div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1">
            <span class="label-caps text-primary mb-3 d-block">Dual-Engine Intelligence</span>
            <h2 class="fw-bold mb-4">Hybrid AI for Local Context</h2>
            <p class="text-muted lead-sm mb-0">
              Kami menggabungkan <strong>IndoBERT</strong> untuk memahami nuansa bahasa Indonesia yang kompleks (slang, sarkasme, konteks lokal) dengan <strong>Gemini Pro</strong> untuk penalaran logis tingkat tinggi.
            </p>
          </div>
        </div>

        <div class="row align-items-center mb-5 pb-4 flex-lg-row-reverse">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="feature-graphic shadow-emerald">
              <i class="bi bi-lightbulb-fill text-success display-1"></i>
              <div class="floating-badge success">Strategic Action Plan</div>
            </div>
          </div>
          <div class="col-lg-5">
            <span class="label-caps text-success mb-3 d-block">Beyond Sentiments</span>
            <h2 class="fw-800 mb-4">Turn Data into Decisions</h2>
            <p class="text-muted lead-sm mb-0">
              Jangan cuma melihat grafik. Insightly mendeteksi <strong>Priority Issues</strong> yang sedang terjadi dan memberikan rekomendasi langkah konkret yang bisa langsung tim Anda eksekusi.
            </p>
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="feature-graphic shadow-blue">
              <i class="bi bi-file-earmark-pdf-fill text-info display-1"></i>
              <div class="floating-badge info">Executive Report</div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1">
            <span class="label-caps text-info mb-3 d-block">Presentation Ready</span>
            <h2 class="fw-800 mb-4">Export Reports in Seconds</h2>
            <p class="text-muted lead-sm mb-0">
              Selesaikan analisis ribuan feedback dan miliki laporan PDF profesional dengan satu klik. Siap dipresentasikan di depan stakeholder tanpa perlu edit manual lagi.
            </p>
          </div>
        </div>
        <div class="text-center mt-5 pt-4">
          <button id="cta-start" class="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-indigo-lg">
              Get Started Now <i class="bi bi-arrow-down ms-2"></i>
          </button>
          <p class="text-muted small mt-3">No registration required. Just upload and analyze.</p>
        </div>
      </div>
    `;
  }
}

export default FeatureSection;
