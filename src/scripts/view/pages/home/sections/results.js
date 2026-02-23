class ResultsSection {
  _render() {
    const section = document.createElement('section');
    section.className = 'results-section py-5 mb-5';
    section.innerHTML = `
        <div class="container">
        <div class="row g-3 mb-5">
          <div class="col-md-12">
            <div
              class="bg-white p-4 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="stat-item text-center px-4 border-end">
                <span class="text-muted small fw-bold d-block"
                  >TOTAL PROCESSED</span
                >
                <span class="h3 fw-bold mb-0">1,500</span>
              </div>
              <div class="stat-item text-center px-4 border-end">
                <span class="text-success small fw-bold d-block">POSITIVE</span>
                <span class="h3 fw-bold mb-0">55%</span>
              </div>
              <div class="stat-item text-center px-4 border-end">
                <span class="text-danger small fw-bold d-block">NEGATIVE</span>
                <span class="h3 fw-bold mb-0">37%</span>
              </div>
              <div class="stat-item text-center px-4 w-25">
                <span class="text-muted small fw-bold d-block mb-1"
                  >SENTIMENT RATIO</span
                >
                <div class="progress" style="height: 10px">
                  <div class="progress-bar bg-success" style="width: 55%"></div>
                  <div class="progress-bar bg-danger" style="width: 37%"></div>
                  <div
                    class="progress-bar bg-secondary"
                    style="width: 8%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h5 class="fw-bold mb-4">Strategic Insights Detail</h5>
        <div
          class="accordion accordion-flush shadow-sm rounded-4 overflow-hidden"
          id="insightAccordion"
        >
          <div class="accordion-item border-bottom">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed py-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#issue1"
              >
                <div class="d-flex align-items-center w-100">
                  <span class="badge bg-danger me-3">CRITICAL</span>
                  <span class="fw-bold text-dark"
                    >Authentication & Account Access Issues</span
                  >
                  <span class="ms-auto me-3 text-muted small"
                    >11.2% Impact</span
                  >
                </div>
              </button>
            </h2>
            <div
              id="issue1"
              class="accordion-collapse collapse"
              data-bs-parent="#insightAccordion"
            >
              <div class="accordion-body bg-light-subtle p-4">
                <div class="row">
                  <div class="col-md-5">
                    <h6 class="fw-bold small text-uppercase text-muted">
                      Customer Evidence
                    </h6>
                    <p class="fst-italic border-start border-4 ps-3 py-1">
                      "password salah terus padahal udah ganti, sistemnya bikin
                      pusing!"
                    </p>
                  </div>
                  <div class="col-md-7">
                    <h6 class="fw-bold small text-uppercase text-primary">
                      Technical Recommendation
                    </h6>
                    <ul class="small mb-0">
                      <li>
                        Implementasi logging mendalam pada alur reset password.
                      </li>
                      <li>
                        Audit sistem OTP gateway untuk memastikan delivery rate
                        100%.
                      </li>
                      <li>Review mekanisme session timeout di sisi backend.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return section;
  }
  _initializeEvent() {}
}

export default ResultsSection;
