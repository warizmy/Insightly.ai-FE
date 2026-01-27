class AnalysisLoader {
  constructor(selector) {
    this.el = document.querySelector(selector);
  }

  show() {
    this.el?.classList.add('active');
  }

  hide() {
    this.el?.classList.remove('active');
  }
}

export default AnalysisLoader;
