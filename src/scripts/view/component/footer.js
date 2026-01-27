class Footer {
  render() {
    const footerContainer = document.createElement('footer');
    footerContainer.className = 'footer-container';
    footerContainer.innerHTML = `
      <div class="d-flex flex-wrap align-items-center justify-content-center py-2 border-top">
          <p class="text-center text-secondary">©2026 IndoFood.ai, All Rights Reserved</p>
      </div>`;
    return footerContainer;
  }
}

export default Footer;
