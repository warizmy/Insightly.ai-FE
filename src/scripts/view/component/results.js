import { jsPDF } from 'jspdf';
import SentimentChart from './chart';

class ResultsSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'results-section py-5 d-none';
    this._apiData = null;
  }

  render() {
    return this._container;
  }

  async update(apiData) {
    this._apiData = apiData;

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

    this._bindExportButton();
  }

  _bindExportButton() {
    const btn = this._container.querySelector('#btn-export');
    if (!btn) return;

    btn.addEventListener('click', () => this._exportReport());
  }

  async _exportReport() {
    if (!this._apiData) {
      alert('No data available to export.');
      return;
    }
    const btn = this._container.querySelector('#btn-export');
    const originalText = btn.innerHTML;

    // Loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Generating...';

    try {
      // eslint-disable-next-line camelcase
      const { statistics, strategic_insights } = this._apiData.results;
      const { metadata } = this._apiData;
      // eslint-disable-next-line camelcase
      const safeInsights = strategic_insights || [];

      // eslint-disable-next-line new-cap
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentW = pageW - margin * 2;
      let y = 20;

      // Header
      doc.setFillColor(79, 70, 229); // indigo
      doc.rect(0, 0, pageW, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Sentiment Analysis Report', margin, 19);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Generated: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}`,
        pageW - margin,
        19,
        { align: 'right' },
      );

      y = 42;

      // Source File
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.text(`Source File: ${metadata.filename}`, margin, y);
      y += 12;

      // Summary Statistics
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Summary Statistics', margin, y);
      y += 6;

      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageW - margin, y);
      y += 8;

      const statCards = [
        {
          label: 'Total Records',
          value: metadata.total_records,
          color: [79, 70, 229],
        },
        {
          label: 'Positive Feedback',
          value: statistics.positive_count,
          color: [34, 197, 94],
        },
        {
          label: 'Neutral Mentions',
          value: statistics.neutral_count,
          color: [14, 165, 233],
        },
        {
          label: 'Negative Feedback',
          value: statistics.negative_count,
          color: [239, 68, 68],
        },
      ];

      const cardW = (contentW - 9) / 4;
      statCards.forEach((card, i) => {
        const x = margin + i * (cardW + 3);
        doc.setFillColor(...card.color);
        doc.roundedRect(x, y, cardW, 22, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(card.value.toLocaleString(), x + cardW / 2, y + 11, {
          align: 'center',
        });
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text(card.label, x + cardW / 2, y + 18, { align: 'center' });
      });

      y += 32;

      // Insights Header
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Priority Issues Detected', margin, y);
      y += 4;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Based on ${statistics.negative_count.toLocaleString()} negative feedbacks (${((statistics.negative_count / metadata.total_records) * 100).toFixed(2)}% of total)`,
        margin,
        y + 4,
      );
      y += 12;

      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageW - margin, y);
      y += 6;

      // Insight Items
      const urgencyColorMap = {
        critical: [239, 68, 68],
        high: [245, 158, 11],
        medium: [14, 165, 233],
        low: [34, 197, 94],
      };

      safeInsights.forEach((item, i) => {
        if (y > 240) {
          doc.addPage();
          y = 20;
        }

        const urgencyKey = item.urgency.toLowerCase();
        const [r, g, b] = urgencyColorMap[urgencyKey] || [150, 150, 150];

        // Number + Topic
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 30, 30);
        const topicLines = doc.splitTextToSize(
          `${i + 1}. ${item.topic}`,
          contentW - 35,
        );
        doc.text(topicLines, margin, y);
        y += (topicLines.length - 1) * 5;

        // Urgency Tag
        doc.setFillColor(r, g, b);
        doc.roundedRect(pageW - margin - 28, y - 5, 28, 7, 1.5, 1.5, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text(item.urgency.toUpperCase(), pageW - margin - 14, y - 0.5, {
          align: 'center',
        });

        y += 6;

        // Percentage Bar
        doc.setFillColor(230, 230, 230);
        doc.rect(margin, y, contentW * 0.5, 3, 'F');
        doc.setFillColor(r, g, b);
        doc.rect(
          margin,
          y,
          contentW * 0.5 * (item.percentage_estimate / 100),
          3,
          'F',
        );
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `${item.percentage_estimate}% of complaints`,
          margin + contentW * 0.5 + 3,
          y + 2.5,
        );

        y += 8;

        // Evidence
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        const evidenceLines = doc.splitTextToSize(
          `Evidence: "${item.evidence}"`,
          contentW,
        );
        doc.text(evidenceLines, margin, y);
        y += evidenceLines.length * 4.5;

        // Recommendation
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        const recLines = doc.splitTextToSize(
          `Recommendation: ${item.recommendation}`,
          contentW,
        );
        doc.text(recLines, margin, y);
        y += recLines.length * 4.5 + 5;

        // Divider
        doc.setDrawColor(240, 240, 240);
        doc.line(margin, y, pageW - margin, y);
        y += 6;
      });

      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFontSize(8);
        doc.setTextColor(160, 160, 160);
        doc.text(
          `Page ${p} of ${totalPages}`,
          pageW / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: 'center' },
        );
      }

      // Save
      const filename = `sentiment-report-${metadata.filename.replace(/\.[^.]+$/, '')}-${Date.now()}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to generate report. Please try again.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
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

      <div class="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-2">
        <div class="d-flex flex-column gap-2">
          <h4 class="fw-800 mb-0">Priority Issues Detected</h4>
          <span class="text-muted" style="font-size: 14px;">Analysis based on ${stats.negative_count.toLocaleString()} negative feedbacks detected (${((stats.negative_count / meta.total_records) * 100).toFixed(2)}% of total records)</span>
        </div>
        <button id="btn-export" class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
          <i class="bi bi-file-earmark-pdf me-2"></i> Export Report
        </button>
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
                style="width: ${item.percentage_estimate}%">
            </div>
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
