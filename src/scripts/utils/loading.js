class LoadingCircle {
  constructor(selector = '#loading-circle-container') {
    this._loadingCircle = document.querySelector(selector);
  }

  show() {
    if (!this._loadingCircle) return;
    this._loadingCircle.style.display = 'flex';
  }

  hide() {
    if (!this._loadingCircle) return;
    this._loadingCircle.style.display = 'none';
  }

  isActive() {
    if (!this._loadingCircle) return false;
    return this._loadingCircle.style.display === 'flex';
  }
}

export default LoadingCircle;
