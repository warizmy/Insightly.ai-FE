/* eslint-disable no-use-before-define */

class Popup {
  constructor() {
    if (!document.getElementById('global-popup')) {
      this._createElement();
    }
    this.el = document.getElementById('global-popup');
    this.msgEl = this.el.querySelector('.popup-message');
    this.btnCancel = this.el.querySelector('.btn-cancel');
    this.btnConfirm = this.el.querySelector('.btn-confirm');
  }

  _createElement() {
    const html = `
      <div id="global-popup" class="popup-overlay">
        <div class="popup-box">
          <div class="popup-content">
            <div class="popup-icon mb-3">
              <i class="bi bi-exclamation-circle text-warning" style="font-size: 3rem;"></i>
            </div>
            <p class="popup-message mb-4"></p>
            <div class="popup-actions d-flex gap-2 justify-content-center">
              <button class="btn btn-light btn-cancel rounded-pill px-4">Batal</button>
              <button class="btn btn-warning btn-confirm rounded-pill px-4 fw-bold">Oke</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /**
   * @param {string} message
   * @param {boolean} isConfirm
   */
  show(message, isConfirm = false) {
    this.msgEl.textContent = message;
    this.el.classList.add('active');

    this.btnCancel.style.display = isConfirm ? 'block' : 'none';

    return new Promise((resolve) => {
      const onConfirm = () => {
        this.hide();
        resolve(true);
        cleanup();
      };

      const onCancel = () => {
        this.hide();
        resolve(false);
        cleanup();
      };

      const cleanup = () => {
        this.btnConfirm.removeEventListener('click', onConfirm);
        this.btnCancel.removeEventListener('click', onCancel);
      };

      this.btnConfirm.addEventListener('click', onConfirm);
      this.btnCancel.addEventListener('click', onCancel);
    });
  }

  hide() {
    this.el.classList.remove('active');
  }
}

export default Popup;
