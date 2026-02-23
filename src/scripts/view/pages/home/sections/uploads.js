class UploadsSection {
  render() {
    const section = document.createElement('section');
    section.className = 'upload-section py-5 my-5 bg-light';
    section.id = 'dashboard';
    section.innerHTML = `
        <div class="container text-center pb-3">
            <h1 class="fw-bold mb-2">From Data to <span class="main-gradient-text">Strategy</span></h1>
            <p class="text-muted">Upload your dataset to generate strategic business insights instantly.</p>
        </div>
        <div class="container">
            <div class="upload-card mx-auto p-5 text-center bg-white rounded-4 border-dashed" style="max-width: 800px">
                <i class="bi bi-cloud-arrow-up display-1 text-primary"></i>
                <h3 class="mt-3 fw-bold">Advanced Batch Analysis</h3>
                <p class="text-muted">
                    Drag & drop your CSV or Excel here, or click to browse.
                </p>
                <p class="small text-muted">Max 2000 rows or 5MB.</p>
                <input type="file" id="file-upload" hidden />
                <button
                    class="btn btn-lg btn-purple text-white px-5 rounded-pill"
                    id="btn-upload">
                    Browse Files
                </button>
                <div class="mt-3" id="download-sample-container" style="display: none;">
                    <a href="#" class="text-decoration-none small text-primary fw-bold">
                        Download Sample CSV
                    </a>
                </div>
            </div>
        </div>`;
    return section;
  }
}

export default UploadsSection;
