import SentimentChart from '../../../component/chart';

class ResultsSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'results-section py-5 d-block';
  }

  render() {
    return this._container;
  }

  async update(apiData) {
    // eslint-disable-next-line camelcase
    const { statistics, strategic_insights } = apiData.results;
    const { metadata } = apiData;

    this._container.innerHTML = this._getTemplate(
      statistics,
      metadata,
      strategic_insights,
    );
    this._container.classList.remove('d-none');

    SentimentChart.render('sentimentChart', [
      statistics.positive_count,
      statistics.negative_count,
      statistics.neutral_count,
    ]);
  }

  _getTemplate(stats, meta, insights) {
    const safeInsights = insights || [];

    return `
    <div class="container">
      <h4 class="fw-800 mb-4">Priority Issues Detected</h4>
      
      <div class="modern-accordion border">
        <div class="priority-header d-none d-md-flex align-items-center px-4 py-3">
          <div style="width: 120px;" class="flex-shrink-0">
            <span class="fs-6 label-caps">Status</span>
          </div>
          <div class="flex-grow-1 px-3">
            <span class="fs-6 label-caps">Detected Topic</span>
          </div>
          <div style="width: 180px;" class="ms-auto flex-shrink-0">
            <span class="fs-6 label-caps">Impact Score</span>
          </div>
          <div style="width: 20px;" class="ms-3 flex-shrink-0"></div> </div>

        <div id="insightAccordion">
          ${
  safeInsights.length > 0
    ? safeInsights
      .map((item, i) => this._renderInsightItem(item, i))
      .join('')
    : '<p class="p-4 text-muted">No strategic insights generated.</p>'
}
        </div>
      </div>
    </div>
  `;
  }

  _renderStatCard(label, count, color, icon) {
    return `
      <div class="col-md-6">
        <div class="bento-card p-4 shadow-soft h-100 border-start-${color}">
          <i class="bi ${icon} text-${color} h3"></i>
          <h3 class="fw-800 mt-2">${count}</h3>
          <p class="text-muted mb-0">${label} Feedbacks</p>
        </div>
      </div>`;
  }

  _renderInsightItem(item, index) {
    const urgencyColor = this._getSeverity(item.urgency);
    const impactColor = this._getSeverity(item.percentage_estimate);

    return `
    <div class="priority-row">
      <div class="p-4 d-flex align-items-center cursor-pointer collapsed" 
           data-bs-toggle="collapse" 
           data-bs-target="#insight-${index}">
        
        <div style="width: 120px;" class="d-none d-md-block flex-shrink-0">
          <span class="urgency-tag ${urgencyColor}">${item.urgency.toUpperCase()}</span>
        </div>

        <div class="flex-grow-1 px-md-3">
          <span class="fw-700 text-dark d-block line-clamp-2">
            ${item.topic}
          </span>
        </div>

        <div class="d-flex align-items-center gap-3 ms-auto flex-shrink-0" style="width: 180px;">
          <div class="progress flex-grow-1" style="height: 6px;">
            <div class="progress-bar bg-${impactColor}" 
                 style="width: ${item.percentage_estimate}%"></div>
          </div>
          <span class="fw-800 small text-dark" style="width: 45px;">${item.percentage_estimate}%</span>
        </div>

        <div class="ms-3 flex-shrink-0">
          <i class="bi bi-chevron-down chevron-icon opacity-50"></i>
        </div>
      </div>

      <div id="insight-${index}" class="collapse" data-bs-parent="#insightAccordion">
        <div class="px-4 pb-4">
          <div class="detail-box p-4 rounded-4 shadow-sm bg-light">
            <div class="row g-4">
              <div class="col-md-5">
                <label class="label-caps mb-2">Evidence from Feedback</label>
                <div class="evidence-quote">
                  <i class="bi bi-quote opacity-25 h3 mb-0 me-2"></i>
                  <span>${item.evidence}</span>
                </div>
              </div>
              <div class="col-md-7">
                <label class="label-caps mb-2 text-purple">Action Plan</label>
                <div class="p-3 bg-white rounded-3 border">
                  <p class="small mb-0 line-height-relaxed">${item.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  _getSeverity(value) {
    // Jika yang dikirim adalah string (Urgency: Critical, High, etc)
    if (typeof value === 'string') {
      const val = value.toLowerCase();
      if (val === 'critical') return 'danger'; // Merah
      if (val === 'high') return 'warning'; // Oranye
      if (val === 'medium') return 'info'; // Biru
      return 'success'; // Hijau (Low)
    }

    // Jika yang dikirim adalah angka (Impact Percentage)
    const pct = parseInt(value, 10);
    if (pct <= 10) return 'success'; // Hijau
    if (pct <= 20) return 'info'; // Biru
    if (pct <= 40) return 'warning'; // Kuning/Oranye
    return 'danger'; // Merah (>40%)
  }
}

export default ResultsSection;
