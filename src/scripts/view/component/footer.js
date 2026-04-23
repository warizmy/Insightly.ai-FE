class Footer {
  render() {
    const footerContainer = document.createElement('footer');
    footerContainer.className = 'footer-container py-3 mt-4';
    footerContainer.innerHTML = `
      <div class="container">
        <div class="footer-content d-flex flex-wrap align-items-center justify-content-center">
            <p class="mb-0">© 2026 Insightly.ai — Built for Strategic Growth</p>
        </div>
      </div>`;
    return footerContainer;
  }
}

export default Footer;
