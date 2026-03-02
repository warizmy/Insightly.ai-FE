class GuideSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'guide-section py-5';
    this._container.id = 'how-it-works';
    this._render();
  }

  render() {
    return this._container;
  }

  _render() {
    this._container.innerHTML = `
      <div class="container">
        <div class="text-center mb-5">
          <span class="label-caps text-primary mb-2 d-block">The Process</span>
          <h2 class="fw-800 text-dark">How Insightly Works</h2>
          <p class="text-muted mx-auto" style="max-width: 500px;">
            Turn raw customer feedback into strategic decisions in three simple steps.
          </p>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-md-4">
            <div class="step-card text-center p-4 h-100">
              <div class="step-number">1</div>
              <div class="step-icon-wrapper mb-4">
                <i class="bi bi-cloud-arrow-up-fill"></i>
              </div>
              <h5 class="fw-700">Connect Data</h5>
              <p class="small text-muted mb-0">
                Upload your CSV or Excel files. We support various feedback formats and automatically detect the right columns.
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="step-card text-center p-4 h-100">
              <div class="step-number">2</div>
              <div class="step-icon-wrapper mb-4 secondary">
                <i class="bi bi-cpu-fill"></i>
              </div>
              <h5 class="fw-700">AI Analysis</h5>
              <p class="small text-muted mb-0">
                Our hybrid IndoBERT & Gemini engine identifies sentiment patterns and extracts the most critical business issues.
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="step-card text-center p-4 h-100">
              <div class="step-number">3</div>
              <div class="step-icon-wrapper mb-4 success">
                <i class="bi bi-file-earmark-check-fill"></i>
              </div>
              <h5 class="fw-700">Get Strategies</h5>
              <p class="small text-muted mb-0">
                Receive actionable recommendations and export them into professional PDF reports for your executive meetings.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default GuideSection;
