class GuideSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'guide-section py-5 my-5';
    this._container.id = 'how-it-works';
    this._render();
  }

  render() {
    return this._container;
  }

  _render() {
    // Di dalam GuideSection.js _render()
    this._container.innerHTML = `
<div class="container py-4">
  <div class="text-center pb-4">
    <h2 class="fw-bold">Simple 3-Step <span class="main-gradient-text">Analysis</span></h2>
    <p class="text-muted">Get started in just a few minutes with our intuitive workflow</p>
  </div>

  <div class="vertical-timeline">
    <div class="timeline-item">
      <div class="timeline-dot bg-purple">1</div>
      <div class="timeline-content shadow-soft">
        <div class="d-flex align-items-center mb-2">
          <div class="mini-icon icon-box-purple me-3">
            <i class="bi bi-cloud-arrow-up-fill"></i>
          </div>
          <h5 class="fw-bold mb-0">Connect Your Feedback Data</h5>
        </div>
        <p class="text-muted mb-0">
          Upload your CSV or Excel files from Google Play Store, App Store, or social media exports.
        </p>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-dot bg-blue">2</div>
      <div class="timeline-content shadow-soft">
        <div class="d-flex align-items-center mb-2">
          <div class="mini-icon icon-box-blue me-3">
            <i class="bi bi-cpu-fill"></i>
          </div>
          <h5 class="fw-bold mb-0">Hybrid AI Processing</h5>
        </div>
        <p class="text-muted mb-0">
          Our advanced engine runs IndoBERT for precise sentiment detection and Gemini for strategic topic extraction.
        </p>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-dot bg-emerald">3</div>
      <div class="timeline-content shadow-soft">
        <div class="d-flex align-items-center mb-2">
          <div class="mini-icon icon-box-emerald me-3">
            <i class="bi bi-file-earmark-check-fill"></i>
          </div>
          <h5 class="fw-bold mb-0">Unlock Actionable Strategies</h5>
        </div>
        <p class="text-muted mb-0">
          Get clear, prioritized insights and automated recommendations. Export your findings into a professional PDF report.
        </p>
      </div>
    </div>
  </div>
</div>
`;
  }
}

export default GuideSection;
