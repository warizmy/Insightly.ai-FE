import AnalysisLoader from '../../utils/analysisLoader';
import Api from '../../utils/api';
import HistoryStorage from '../../utils/historyStorage';
import Popup from '../../utils/popUp';

class CekMakanan {
  constructor() {
    this._abortController = new AbortController();
    this._previewUrl = null;
  }

  _render() {
    const section = document.createElement('section');

    section.innerHTML = `
      <div class="container py-5 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 mb-4">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
              <div class="card-header bg-white border-0 pt-4 px-4">
                <h5 class="fw-bold mb-0">Identifikasi Makanan</h5>
                <p class="text-muted small">
                  Unggah foto makanan Indonesia Anda
                </p>
              </div>

              <div class="card-body px-4 pb-4">
                <div
                  id="dropZone"
                  class="upload-area border border-2 border-dashed rounded-4 p-4 text-center bg-light mb-3"
                >
                  <input type="file" id="imageInput" accept="image/*" hidden />

                  <div id="uploadPlaceholder">
                    <i class="bi bi-cloud-arrow-up text-warning display-4"></i>
                    <p class="mt-2 mb-1 fw-bold">
                      Klik atau tarik gambar ke sini
                    </p>
                    <span class="text-muted small">
                      Mendukung: JPG, PNG, WEBP
                    </span>
                  </div>

                  <img
                    id="imagePreview"
                    class="img-fluid rounded-3 d-none shadow-sm"
                    alt="Preview"
                  />
                </div>

                <button
                  id="btnPredict"
                  class="btn btn-warning w-100 py-2 fw-bold rounded-pill shadow-sm"
                >
                  <span id="btnText">Analisis Sekarang</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-7 mb-4">
            <div class="card border-0 shadow-sm rounded-4 h-100">
              <div id="analysisLoader" class="analysis-loader">
                <div class="text-center">
                  <div class="analysis-spinner mx-auto mb-2"></div>
                  <p class="small fw-bold text-muted">Menganalisis...</p>
                </div>
              </div>
              <div class="card-body p-4 p-md-5">
                <div id="placeholderText" class="text-center py-5">
                  <div class="mb-3 text-muted opacity-25">
                    <i class="bi bi-journal-text" style="font-size: 5rem"></i>
                  </div>
                  <h5 class="text-muted">
                    Hasil resep akan muncul di sini
                  </h5>
                  <p class="small text-muted px-lg-5">
                    Pastikan foto makanan terlihat jelas agar AI dapat memberikan
                    resep yang akurat.
                  </p>
                </div>

                <div id="resultContent" class="d-none">
                  <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <div class="flex-grow-1">
                      <h6 class="text-success fw-bold text-uppercase small mb-1">
                        Hasil Deteksi
                      </h6>
                      <h3 id="resFoodName" class="fw-bold mb-0">-</h3>
                    </div>
                  </div>

                  <div
                    class="recipe-container bg-light rounded-4 p-4 shadow-inner"
                    style="max-height: 500px; overflow-y: auto"
                  >
                    <div
                      id="resRecipe"
                      class="recipe-content text-secondary fs-6 lh-lg"
                    ></div>
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

  _initializeEvent() {
    const loader = new AnalysisLoader('#analysisLoader');
    const popUp = new Popup();

    const dropZone = document.getElementById('dropZone');
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('imagePreview');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');

    const btnPredict = document.getElementById('btnPredict');

    const placeholderText = document.getElementById('placeholderText');
    const resultContent = document.getElementById('resultContent');
    const resFoodName = document.getElementById('resFoodName');
    const resRecipe = document.getElementById('resRecipe');

    let selectedFile = null;

    dropZone.addEventListener('click', () => {
      imageInput.click();
    });

    // File Select
    imageInput.addEventListener('change', (e) => {
      selectedFile = e.target.files[0];
      if (!selectedFile) return;

      if (this._previewUrl) {
        URL.revokeObjectURL(this._previewUrl);
      }

      this._previewUrl = URL.createObjectURL(selectedFile);

      preview.src = this._previewUrl;
      preview.classList.remove('d-none');
      uploadPlaceholder.classList.add('d-none');
    });

    // Predict
    btnPredict.addEventListener('click', async () => {
      if (!selectedFile) {
        await popUp.show('Pilih Gambar Terlebih Dahulu!');
        return;
      }

      loader.show();
      btnPredict.disabled = true;

      const resultCard = document.getElementById('analysisLoader').parentElement;
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

      try {
        const response = await Api.predictFood(selectedFile, {
          signal: this._abortController.signal,
        });

        HistoryStorage.save({
          id: Date.now().toString(),
          foodName: response.food_name,
          confidence: response.confidence,
          imageUrl: response.image_url,
          createdAt: new Date().toISOString(),
        });

        placeholderText.classList.add('d-none');
        resultContent.classList.remove('d-none');

        resFoodName.textContent = response.food_name;
        resRecipe.innerHTML = marked.parse(response.recipe);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch dibatalkan karena pindah page.');
          return;
        }
        alert(error.message || 'Terjadi kesalahan');
      } finally {
        loader.hide();
        btnPredict.disabled = false;
      }
    });
  }

  _destroy() {
    this._abortController.abort(); // TOTALLY KILL THE REQUEST

    if (this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl);
      this._previewUrl = null;
    }
  }
}

export default CekMakanan;
