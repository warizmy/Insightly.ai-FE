import SentimentChart from '../../../component/chart';

class ResultsSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'results-section py-5 d-none';
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
      <div class="row g-4 mb-5">
        <div class="col-lg-5">
          <div class="bento-card p-4 h-100 shadow-soft">
            <h5 class="fw-700 mb-4 text-dark">Sentiment Distribution</h5>
            <div class="chart-wrapper">
              <canvas id="sentimentChart"></canvas>
              <div class="chart-overlay">
                <span class="d-block h2 fw-800 mb-0">${meta.total_records.toLocaleString()}</span>
                <span class="label-caps" style="font-size: 8px;">Total Records</span>
              </div>
            </div>
            <div class="text-center mt-4 p-3 bg-light rounded-4">
              <p class="small text-muted mb-0">
                <i class="bi bi-file-earmark-bar-graph me-1"></i> Source File: 
                  <span class="fw-700 text-dark text-truncate d-inline-block align-middle" style="max-width: 200px;">
                    ${meta.filename}
                  </span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="row g-4 h-100">
            ${this._renderStatCard('Positive Feedback', stats.positive_count, 'success', 'bi-emoji-smile-fill')}
            ${this._renderStatCard('Neutral Mentions', stats.neutral_count, 'info', 'bi-emoji-neutral-fill')}
            ${this._renderStatCard('Negative Feedback', stats.negative_count, 'danger', 'bi-emoji-frown-fill')}
          </div>
        </div>
      </div>

      <div class="d-flex flex-column align-items-start mb-4 gap-1">
        <h4 class="fw-800 mb-0">Priority Issues Detected</h4>
        <span class="text-muted" style="font-size: 14px;">Analysis based on ${stats.negative_count.toLocaleString()} negative feedbacks detected (${((stats.negative_count / meta.total_records) * 100).toFixed(2)}% of total records)</span>
      </div>
      
      <div class="modern-accordion">
        <div class="priority-header d-none d-md-flex align-items-center p-4">
          <div style="width: 120px;" class="flex-shrink-0">
            <span class="fs-6 label-caps custom-tooltip" data-tooltip="Urgency level of the issue based on sentiment and impact analysis">
              Status <i class="bi bi-info-circle ms-1 help-icon"></i>
            </span>
          </div>
          <div class="flex-grow-1 px-3">
            <span class="fs-6 label-caps custom-tooltip" data-tooltip="Specific category of the detected problem">
              Specific Issue <i class="bi bi-info-circle ms-1 help-icon"></i>
            </span>
          </div>
          <div style="width: 180px;" class="ms-auto flex-shrink-0 text-end pe-4">
            <span class="fs-6 label-caps custom-tooltip" data-tooltip="Percentage of contribution of this topic to total complaints (Negative Feedback) detected">
              % of Complaints <i class="bi bi-info-circle ms-1 help-icon"></i>
            </span>
          </div>
          <div style="width: 20px;" class="ms-3 flex-shrink-0"></div>
        </div>

        <div id="insightAccordion">
          ${
  safeInsights.length > 0
    ? safeInsights
      .map((item, i) => this._renderInsightItem(item, i))
      .join('')
    : '<p class="p-4 text-muted text-center">No strategic insights generated.</p>'
}
        </div>
      </div>
    </div>`;
  }

  _renderStatCard(label, count, color, icon) {
    return `
      <div class="col-md-4 col-sm-6">
        <div class="bento-card p-4 shadow-soft h-100 border-bottom-custom-${color}">
          <div class="d-flex align-items-center mb-3">
            <div class="icon-shape bg-${color}-soft text-${color} rounded-circle me-3">
              <i class="bi ${icon}"></i>
            </div>
            <span class="label-caps text-muted" style="font-size: 9px;">${label}</span>
          </div>
          <h2 class="fw-800 mb-1">${count.toLocaleString()}</h2>
          <p class="text-muted small mb-0">Identified entries</p>
        </div>
      </div>`;
  }

  _renderInsightItem(item, index) {
    const urgencyColor = this._getSeverity(item.urgency);
    const impactColor = this._getSeverity(item.percentage_estimate);

    return `
    <div class="priority-row">
      <div role="button" class="p-4 d-flex align-items-center cursor-pointer collapsed" 
           data-bs-toggle="collapse" 
           data-bs-target="#insight-${index}">
        
        <div style="width: 120px;" class="d-none d-md-block flex-shrink-0">
          <span class="urgency-tag ${urgencyColor}">${item.urgency.toUpperCase()}</span>
        </div>

        <div class="flex-grow-1 px-md-3">
          <span class="fw-600 text-dark d-block line-clamp-2">
            ${item.topic}
          </span>
        </div>

        <div class="d-flex align-items-center gap-3 ms-auto flex-shrink-0" style="width: 180px;">
          <div class="progress flex-grow-1" style="height: 6px;">
            <div class="progress-bar bg-${impactColor}" 
                 style="width: ${item.percentage_estimate}%"></div>
          </div>
          <span class="fw-600 small text-dark" style="width: 45px;">${item.percentage_estimate}%</span>
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
    if (typeof value === 'string') {
      const val = value.toLowerCase();
      if (val === 'critical') return 'danger';
      if (val === 'high') return 'warning';
      if (val === 'medium') return 'info';
      return 'success';
    }

    const pct = parseInt(value, 10);
    if (pct <= 10) return 'success';
    if (pct <= 20) return 'info';
    if (pct <= 40) return 'warning';
    return 'danger'; // Merah (>40%)
  }
}

export default ResultsSection;
