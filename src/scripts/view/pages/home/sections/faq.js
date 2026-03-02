class FAQSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'faq-section py-5 mb-5';
    this._container.id = 'faq';
    this._render();
  }

  render() {
    return this._container;
  }

  _render() {
    const faqs = [
      {
        q: 'Is my data secure?',
        a: 'Absolutely. We prioritize your privacy. All uploaded files are processed in-memory and are automatically deleted from our system once the analysis is complete. We do not store your raw data.',
      },
      {
        q: 'How accurate is the sentiment analysis?',
        a: "By combining IndoBERT (optimized for Indonesian context) and Gemini Pro's reasoning, Insightly achieves over 90% accuracy in detecting local slang, sarcasm, and complex emotional nuances.",
      },
      {
        q: 'What file formats are supported?',
        a: 'Currently, we support .CSV, .XLSX, and .XLS files. Ensure your dataset contains a column for text feedback for the AI to analyze properly.',
      },
      {
        q: 'Is there a limit to the number of rows?',
        a: 'For the best experience and speed, we recommend uploading datasets with up to 2,000 rows per analysis. For larger datasets, feel free to reach out to our team.',
      },
    ];

    this._container.innerHTML = `
      <div class="container" style="max-width: 800px;">
        <div class="text-center mb-4">
          <h2 class="fw-bold text-dark">Frequently Asked <span class="main-gradient-text">Questions</span></h2>
          <p class="text-muted">Got questions? We've got answers. Here are some of the most common inquiries about Insightly.</p>
        </div>

        <div class="faq-accordion">
          ${faqs
    .map(
      (item, i) => `
            <div class="faq-item border-bottom mb-2">
              <div class="faq-header d-flex justify-content-between align-items-center py-4 cursor-pointer collapsed" 
                   data-bs-toggle="collapse" 
                   data-bs-target="#faq-${i}">
                <h6 class="fw-600 mb-0 text-dark">${item.q}</h6>
                <div class="faq-icon-wrapper">
                  <i class="bi bi-plus-lg"></i>
                </div>
              </div>
              <div id="faq-${i}" class="collapse" data-bs-parent=".faq-accordion">
                <div class="pb-4">
                  <p class="text-muted mb-0 line-height-relaxed small">
                    ${item.a}
                  </p>
                </div>
              </div>
              <hr class="faq-divider my-0 border-0 border-top border-muted opacity-100">
            </div>
          `,
    )
    .join('')}
        </div>
      </div>
    `;
  }
}

export default FAQSection;
