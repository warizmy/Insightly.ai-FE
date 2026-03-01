import Api from '../../../../utils/api';
import Popup from '../../../../utils/popUp';

class UploadsSection {
  constructor() {
    this._container = document.createElement('section');
    this._container.className = 'upload-section py-5 bg-light';
    this._container.id = 'upload-zone';
    this._isUploading = false;
    this._popup = new Popup();
  }

  render() {
    this._container.innerHTML = this._getTemplate();
    return this._container;
  }

  /**
   * @param {Object} callbacks
   */
  _initializeEvent({ onSuccess, onError }) {
    const dropZone = this._container.querySelector('.upload-card');
    const fileInput = this._container.querySelector('#file-upload');
    const browseBtn = this._container.querySelector('#btn-browse');

    browseBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this._handleUpload(file, onSuccess, onError);
    });

    ['dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (eventName === 'dragover') dropZone.classList.add('border-primary', 'bg-primary-subtle');
        else dropZone.classList.remove('border-primary', 'bg-primary-subtle');

        if (eventName === 'drop') {
          const file = e.dataTransfer.files[0];
          this._handleUpload(file, onSuccess, onError);
        }
      });
    });
  }

  async _handleUpload(file, onSuccess, onError) {
    if (this._isUploading) return;

    // Reading Files
    this._updateStatus('reading');

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      this._popup.show('Format file tidak didukung! Gunakan CSV atau Excel.');
      this._updateStatus('idle');
      return;
    }

    this._isUploading = true;

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Preprocessing
      this._updateStatus('preprocessing');
      const formData = new FormData();
      formData.append('file', file);

      // Analyzing
      setTimeout(() => {
        if (this._isUploading) this._updateStatus('analyzing');
      }, 1500);

      const data = await Api.analyzeUpload(file);

      if (data.status === 'success') {
        onSuccess(data);
      } else {
        throw new Error(data.detail || 'Failed to analyze file');
      }
    } catch (err) {
      console.error(err);
      this._popup.show(`Failed to process file: ${err.message}`);
      if (onError) onError(err.message);
    } finally {
      this._isUploading = false;
      this._updateStatus('idle');
    }
  }

  _updateStatus(stage) {
    const btn = this._container.querySelector('#btn-browse');
    const statusText = this._container.querySelector('#upload-status-text');

    const stages = {
      reading: {
        btn: '<span class="spinner-border spinner-border-sm me-2"></span>Reading...',
        text: 'Reading and validating your dataset...',
      },
      preprocessing: {
        btn: '<span class="spinner-border spinner-border-sm me-2"></span>Preprocessing...',
        text: 'Cleaning data and preparing for AI models...',
      },
      analyzing: {
        btn: '<span class="spinner-grow spinner-grow-sm me-2"></span>Analyzing...',
        text: 'Insightly AI is pinpointing strategic issues. This might take a moment...',
      },
      idle: {
        btn: 'Browse Files',
        text: 'Drag & drop your CSV or Excel here, or click to browse.',
      },
    };

    const current = stages[stage];
    btn.disabled = stage !== 'idle';
    btn.innerHTML = current.btn;
    statusText.innerText = current.text;

    if (stage === 'analyzing') {
      statusText.classList.add('fw-bold', 'text-primary');
    } else {
      statusText.classList.remove('fw-bold', 'text-primary');
    }
  }

  // _setLoading(isLoading) {
  //   this._isUploading = isLoading;
  //   const btn = this._container.querySelector('#btn-browse');
  //   const statusText = this._container.querySelector('#upload-status-text');

  //   if (isLoading) {
  //     btn.disabled = true;
  //     btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
  //     statusText.innerText = 'Models are analyzing your data. This might take a minute...';
  //   } else {
  //     btn.disabled = false;
  //     btn.innerHTML = 'Browse Files';
  //     statusText.innerText = 'Drag & drop your CSV or Excel here, or click to browse.';
  //   }
  // }

  _getTemplate() {
    return `
      <div class="container text-center mb-4">
        <h1 class="fw-bold mb-2">From Data to <span class="main-gradient-text">Strategy</span></h1>
        <p class="text-muted">Upload your dataset to generate strategic business insights instantly.</p>
      </div>
      <div class="container">
        <div class="upload-card mx-auto p-5 text-center bg-white rounded-5 border-dashed shadow-soft" style="max-width: 800px;">
          <div class="mb-4">
            <i class="bi bi-cloud-arrow-up-fill display-2 text-primary opacity-25"></i>
          </div>
          <h4 class="fw-bold">Advanced Batch Analysis</h4>
          <p id="upload-status-text" class="text-muted">Drag & drop your CSV or Excel here, or click to browse.</p>
          <input type="file" id="file-upload" accept=".csv, .xlsx, .xls" hidden>
          <div class="d-flex flex-column align-items-center gap-3">
            <button id="btn-browse" class="btn btn-lg btn-purple text-white px-5 rounded-pill shadow-sm">
              Browse Files
            </button>
            <a href="#" class="text-decoration-none small text-primary fw-bold d-none">
              <i class="bi bi-file-earmark-arrow-down me-1"></i>Download Sample CSV
            </a>
          </div>
          <div class="mt-4 pt-3 border-top">
            <small class="text-muted">Max 2,000 rows • CSV, XLSX, XLS supported</small>
          </div>
        </div>
      </div>
    `;
  }
}

export default UploadsSection;
