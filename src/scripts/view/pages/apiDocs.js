class APIDocs {
  constructor() {
    this._container = document.createElement('div');
    this._container.className = 'docs-page container-fluid p-0';
  }

  async _render() {
    this._container.innerHTML = `
      <div class="row g-0">
        <aside class="col-lg-3 docs-sidebar border-end p-4 d-none d-lg-block">
          <h5 class="fw-800 mb-4 px-2">API Reference</h5>
          <nav class="nav flex-column gap-2">
            <a class="nav-link active rounded-3" href="#introduction">Introduction</a>
            <div class="nav-group mt-3">
              <span class="nav-label px-2 opacity-50 small fw-bold text-uppercase">Endpoints</span>
              <a class="nav-link rounded-3" href="#predict-single">POST Predict Single</a>
              <a class="nav-link rounded-3" href="#analyze-batch">POST Analyze Batch</a>
            </div>
          </nav>
        </aside>

        <main class="col-lg-9 col-12 docs-content mt-5 p-5">
          <section id="introduction" class="mb-100">
            <h1 class="fw-800 display-5 mb-3">API Documentation</h1>
            <p class="text-muted lead">Connect your application to <strong>Insightly.ai's</strong> sentiment analysis engine. This documentation helps you integrate technical features quickly.</p>
          </section>

          <section id="predict-single" class="mb-100 border-top pt-5">
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="badge bg-success py-2 px-3">POST</span>
              <code class="fs-5 text-primary">/predict</code>
            </div>
            <h3 class="fw-700">Predict Single Feedback</h3>
            <p class="text-muted">Analyze single text in real-time. Ideal for chatbots or manual input.</p>
            <div class="row g-4 mt-2">
              <div class="col-xl-6">
                <h6 class="label-caps">Request Body (JSON)</h6>
                <pre class="code-block rounded-4 p-3 bg-dark text-white"><code>{
  "text": "Aplikasi ini sangat membantu!"
}</code></pre>
              </div>
              <div class="col-xl-6">
                <h6 class="label-caps text-success">Response Example</h6>
                <pre class="code-block rounded-4 p-3 bg-dark text-info"><code>{
  "status": "success",
  "sentiment": "Positive",
  "confidence": 0.98
}</code></pre>
              </div>
            </div>
          </section>

          <section id="analyze-batch" class="mb-100 border-top pt-5">
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="badge bg-success py-2 px-3">POST</span>
              <code class="fs-5 text-primary">/analyze-upload</code>
            </div>
            <h3 class="fw-700">Analyze Batch Dataset</h3>
            <p class="text-muted">Upload a dataset (CSV/Excel) for mass analysis. Our engine will extract topics and generate strategic insights automatically.</p>
            
            <div class="alert bg-purple-soft border-0 rounded-4 p-4 mt-4">
              <h6 class="fw-bold text-purple"><i class="bi bi-info-circle-fill me-2"></i>Content-Type</h6>
              <p class="small text-muted mb-0">This endpoint expects a <code>multipart/form-data</code> request. Make sure to send the file with the key <strong>"file"</strong>.</p>
            </div>

            <div class="row g-4 mt-4">
              <div class="col-12">
                <h6 class="label-caps">Detailed Response Structure</h6>
                <pre class="code-block rounded-4 p-4 bg-dark text-white"><code>{
  "status": "success",
  "metadata": {
    "filename": "feedback_user.csv",
    "total_records": 1500
  },
  "results": {
    "statistics": {
      "positive_count": 827,
      "negative_count": 559,
      "neutral_count": 114
    },
    "strategic_insights": [
      {
        "urgency": "Critical",
        "topic": "Login Issues",
        "evidence": "Gak bisa login setelah update...",
        "percentage_estimate": 25,
        "recommendation": "Perbaiki API Auth..."
      }
    ]
  }
}</code></pre>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;
    return this._container;
  }

  _initializeEvent() {
    // Logic untuk menghighlight menu sidebar pas di scroll
    const navLinks = this._container.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });
  }
}

export default APIDocs;
