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
    return `
      <div class="container">
        <div class="row g-4 mb-5">
          <div class="col-lg-4">
            <div class="bento-card p-4 h-100 shadow-soft">
              <h5 class="fw-800 mb-4 text-center">Sentiment Overview</h5>
              <div style="height: 200px"><canvas id="sentimentChart"></canvas></div>
              <div class="text-center mt-3">
                <span class="h2 fw-800">${meta.total_records}</span>
                <p class="text-muted small">Processed from ${meta.detected_column}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row g-4 h-100">
              ${this._renderStatCard('Positive', stats.positive_count, 'success', 'bi-emoji-smile')}
              ${this._renderStatCard('Negative', stats.negative_count, 'danger', 'bi-emoji-frown')}
            </div>
          </div>
        </div>
        <h4 class="fw-900 mb-4">Strategic Insights</h4>
        <div class="accordion modern-accordion" id="insightAccordion">
          ${insights.map((item, i) => this._renderInsightItem(item, i)).join('')}
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
    return `
      <div class="insight-item mb-3 shadow-soft bg-white rounded-4 overflow-hidden">
        <div class="p-4 d-flex align-items-center cursor-pointer" data-bs-toggle="collapse" data-bs-target="#insight-${index}">
          <span class="urgency-pill ${item.urgency.toLowerCase()}">${item.urgency}</span>
          <span class="fw-700 ms-3 text-dark">${item.topic}</span>
          <i class="bi bi-chevron-down ms-auto"></i>
        </div>
        <div id="insight-${index}" class="collapse" data-bs-parent="#insightAccordion">
          <div class="p-4 pt-0 border-top-dash row mt-3">
             <div class="col-md-6 border-end">
                <small class="text-muted fw-bold">EVIDENCE</small>
                <p class="fst-italic small mt-2">"${item.evidence}"</p>
             </div>
             <div class="col-md-6">
                <small class="text-primary fw-bold">RECOMMENDATION</small>
                <p class="small mt-2">${item.recommendation}</p>
             </div>
          </div>
        </div>
      </div>`;
  }
}

export default ResultsSection;
