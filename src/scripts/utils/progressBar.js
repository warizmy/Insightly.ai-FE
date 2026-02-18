class ProgressBar {
  constructor() {
    this._barElement = null;
    this._timer = null;
    this._progress = 0;

    this._createBar();
  }

  _createBar() {
    if (!document.querySelector('.top-progress-bar-container')) {
      const container = document.createElement('div');
      container.className = 'top-progress-bar-container';
      container.innerHTML = '<div id="top-progress-bar" class="top-progress-bar"></div>';
      document.body.appendChild(container);
    }
    this._barElement = document.getElementById('top-progress-bar');
  }

  start() {
    this._progress = 0;
    this._barElement.style.opacity = '1';
    this._barElement.style.width = '0%';

    if (this._timer) clearInterval(this._timer);

    this._timer = setInterval(() => {
      this._progress += Math.random() * 5;
      if (this._progress > 90) {
        this._progress = 90;
        clearInterval(this._timer);
      }
      this._barElement.style.width = `${this._progress}%`;
    }, 250);
  }

  finish() {
    clearInterval(this._timer);
    this._barElement.style.width = '100%';

    setTimeout(() => {
      this._barElement.style.opacity = '0';
      setTimeout(() => {
        this._barElement.style.width = '0%';
      }, 400);
    }, 300);
  }
}

export default ProgressBar;
