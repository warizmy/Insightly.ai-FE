import Api from '../../../../services/api';

class HeroSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'hero my-3';
  }

  render() {
    this._container.innerHTML = `
     <div class="container text-center d-flex flex-column align-items-center justify-content-center">
          <div class="mt-4">
               <button onclick="window.location.hash = '/analyze'" class="btn btn-primary btn-lg rounded-pill px-3 py-1 fs-6 shadow-soft">
                    Start Analyzing Now <i class="bi bi-rocket-takeoff ms-2"></i>
               </button>
          </div>
          <h1 class="display-4 fw-bold mt-3">
               Turn Customer Noise into 
               <br>
               <span class="main-gradient-text">Strategic Growth</span>
          </h1>
          <p class="lead text-muted mx-auto py-2" style="max-width: 600px; font-weight: 400">
               Powered by IndoBERT for precision and Gemini AI for strategic intelligence.
          </p>
          
          <div class="sandbox-container mx-auto mt-4 p-4 rounded-5 bg-white shadow-soft" style="max-width: 40em; width: 100%;">
               <div class="input-group mb-0">
                    <input
                         type="text"
                         id="sandbox-input"
                         class="form-control border-0 bg-body-secondary p-3"
                         placeholder="Type your customer feedback here..."
                         style="box-shadow: none !important; border-radius: 12px 0 0 12px;"
                    />
                    <button class="btn btn-primary px-4 fw-bold" id="btn-analyze" style="border-radius: 0 12px 12px 0;">
                         Analyze
                    </button>
               </div>
               
               <div id="sandbox-result" class="text-start mt-3 d-none animate-fade-up">
                    <div class="d-flex align-items-center justify-content-between p-3 rounded-4 bg-light border">
                         <div id="sentiment-badge-container">
                              </div>
                         <div class="text-end">
                              <span id="confidence-text" class="text-muted small fw-600"></span>
                         </div>
                    </div>
               </div>

               <div id="sandbox-error" class="text-danger small mt-2 d-none">
                    <i class="bi bi-exclamation-triangle-fill me-1"></i> Gagal menganalisis teks.
               </div>
          </div>
     </div>`;
    return this._container;
  }

  _initializeEvent() {
    const btn = this._container.querySelector('#btn-analyze');
    const input = this._container.querySelector('#sandbox-input');
    const resultArea = this._container.querySelector('#sandbox-result');
    const badgeContainer = this._container.querySelector(
      '#sentiment-badge-container',
    );
    const confidenceText = this._container.querySelector('#confidence-text');
    const errorArea = this._container.querySelector('#sandbox-error');

    btn.addEventListener('click', async () => {
      const text = input.value.trim();
      if (!text) return;

      // Loading State
      const originalBtnText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
      resultArea.classList.add('d-none');
      errorArea.classList.add('d-none');

      try {
        const data = await Api.predict(text);

        // Update UI based on sentiment
        const sentiment = data.label; // "Positive", "Negative", or "Neutral"
        const confidence = (data.confidence * 100).toFixed(1);

        badgeContainer.innerHTML = this._getBadgeTemplate(sentiment);
        confidenceText.innerText = `Confidence: ${confidence}%`;

        resultArea.classList.remove('d-none');
      } catch (err) {
        console.error(err);
        errorArea.classList.remove('d-none');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btn.click();
    });
  }

  _getBadgeTemplate(sentiment) {
    const config = {
      Positive: {
        class: 'bg-success-subtle text-success border-success',
        icon: 'bi-emoji-smile-fill',
      },
      Negative: {
        class: 'bg-danger-subtle text-danger border-danger',
        icon: 'bi-exclamation-circle-fill',
      },
      Neutral: {
        class: 'bg-info-subtle text-info border-info',
        icon: 'bi-dash-circle-fill',
      },
    };

    const style = config[sentiment] || config.Neutral;
    return `
      <span class="badge rounded-pill ${style.class} p-2 px-3 border">
        <i class="bi ${style.icon} me-1"></i> ${sentiment}
      </span>
    `;
  }
}

export default HeroSection;
