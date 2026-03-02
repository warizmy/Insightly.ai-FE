class CTASection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'cta-final-section py-5';
    this._render();
  }

  render() {
    return this._container;
  }

  _render() {
    this._container.innerHTML = `
      <div class="container">
        <div class="cta-banner p-5 text-center rounded-5 shadow-indigo-lg">
          <h2 class="fw-800 text-white mb-3">Ready to transform your feedback data?</h2>
          <p class="text-white opacity-75 mb-4 mx-auto" style="max-width: 600px;">
            Join professional teams who use Insightly to turn raw customer voices into clear business strategies.
          </p>
          <button onclick="window.location.hash = '/analyze'" class="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold text-purple shadow-sm">
            Get Started<i class="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    `;
  }
}

export default CTASection;
