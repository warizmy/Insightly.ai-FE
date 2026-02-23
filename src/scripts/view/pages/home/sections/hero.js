class HeroSection {
  render() {
    const section = document.createElement('section');
    section.className = 'hero my-3';
    section.innerHTML = `
     <div class="container text-center d-flex flex-column align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center">
               <button class="d-flex text-decoration-none flex-row py-2 px-3 bg-primary-subtle rounded-4 hero-btn" id="heroCta">
                    <p class="d-flex flex-row gap-2 text-primary small m-0">Coba Sekarang
                         <span>
                              <i class="bi bi-rocket-takeoff-fill"></i>
                         </span>
                    </p>
               </button>
          </div>
          <h1 class="display-4 fw-bold">
               Turn Customer Noise into 
               <br>
               <span class="main-gradient-text">
                    Strategic Growth
               </span>
          </h1>
          <p class="lead text-muted mx-auto py-2" style="max-width: 600px; font-weight: 400">
               Powered by IndoBERT for precision and Gemini AI for strategic
               intelligence.
          </p>
          <div class="sandbox-container mx-auto mt-4 shadow p-4 rounded-4 bg-white border" style="max-width: 40em; width: 100%;">
               <div class="input-group mb-3">
                         <input
                              type="text"
                              id="sandbox-input"
                              class="form-control border-0 bg-body-secondary"
                              placeholder="Type your customer feedback here..."
                              style="box-shadow: none !important;"
                         />
                    <button class="btn btn-primary px-4" id="btn-analyze">
                         Analyze
                    </button>
               </div>
               <div id="sandbox-result" class="text-start d-none">
                    <span class="badge rounded-pill bg-danger-subtle text-danger p-2 px-3 border border-danger">
                         <i class="bi bi-exclamation-circle-fill me-1"></i> Negative
                    </span>
                    <span class="ms-2 text-muted small">
                         IndoBERT Confidence: 98.4%
                    </span>
               </div>
          </div>
     </div>`;
    return section;
  }

  _initializeEvent() {
    const buttonCta = document.getElementById('heroCta');

    this._heroCta(buttonCta);
  }

  _heroCta(button){
     button.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
               top: document.querySelector('.upload-section').offsetTop - 20,
               behavior: 'smooth',
          });
     });
  }
}

export default HeroSection;
